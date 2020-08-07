import sortBy from "lodash/sortBy";
import * as React from "react";
import {ActivityIndicator, SectionList, TouchableOpacity, View} from "react-native";
import {Contact as RNContact, default as RNContacts} from "react-native-contacts";
import {Navigation} from "react-native-navigation";
import {Box} from "../Box";
import {Button} from "../Button";
import {TextField} from "../TextField";
import {Text} from "../Text";
import {requestPermissions} from "./Permissions";
import {Tracking} from "./Tracking";
import {Icon} from "../Icon";
import {COLOR_MAP} from "../UnifiedCommon";

interface ContactProps {
  contact: RNContact;
  isSelected: boolean;
  onPress: () => void;
}

export class Contact extends React.Component<ContactProps, {}> {
  render() {
    let phoneNumber;
    // TODO: render each as their own entry.
    if (this.props.contact.phoneNumbers && this.props.contact.phoneNumbers.length > 0) {
      phoneNumber = this.props.contact.phoneNumbers[0].number;
    }

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Box padding={2} display="flex" direction="row">
          <Box paddingX={4} paddingY={2}>
            <Icon prefix="fas" name={this.props.isSelected ? "minus-circle" : "plus-circle"} />
          </Box>
          <Box>
            <Text size="md">
              {this.props.contact.givenName} {this.props.contact.familyName}
            </Text>
            {phoneNumber && <Text size="sm">{phoneNumber}</Text>}
          </Box>
        </Box>
      </TouchableOpacity>
    );
  }
}

export class Contacts {
  // If no filter, uses getAll. If there is a name filter, uses getContactsMatchingString.
  static getContacts(withPhotos = false, filter?: string): Promise<RNContact[]> {
    return new Promise((resolve, reject) => {
      if (filter) {
        RNContacts.getContactsMatchingString(filter, (err: string, contacts: RNContact[]) => {
          if (err) {
            return reject(err);
          }
          return resolve(contacts);
        });
      } else {
        const fetch = withPhotos ? RNContacts.getAll : RNContacts.getAllWithoutPhotos;
        fetch((err, contacts) => {
          if (err) {
            return reject(err);
          }
          return resolve(contacts);
        });
      }
    });
  }

  static openPicker(selected?: RNContact[], recentContacts?: string[]): Promise<RNContact[]> {
    return new Promise((resolve, reject) => {
      //   showFullPageModal("lib.ContactsPicker", "Contacts", {
      //     onCompletion: resolve,
      //     onError: reject,
      //     selected: selected,
      //     recentContacts: recentContacts,
      //   });
      console.warn("NOT IMPLEMENTED");
    });
  }
}

interface ContactsPickerProps {
  componentId: string;

  selected?: RNContact[];
  recentContacts?: string[];
  onCompletion: (contacts: RNContact[]) => void;
  onError: () => void;
}

interface ContactsPickerState {
  loading: boolean;
  text: string;
  hasPermissions: string;
  permissionGranted: boolean | null;
  contacts: RNContact[];
  selected: RNContact[];
  recentContacts: RNContact[];
  search: string;
  searchLoading: boolean;
}

export class ContactsPicker extends React.Component<ContactsPickerProps, ContactsPickerState> {
  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            color: "white",
            text: "Save",
            id: "save",
          },
        ],
        // leftButtons: modalCloseButton("Cancel"),
      },
    };
  }

  constructor(props: ContactsPickerProps) {
    super(props);
    this.state = {
      text: "",
      hasPermissions: "",
      permissionGranted: null,
      contacts: [],
      selected: props.selected || [],
      recentContacts: [],
      search: "",
      loading: true,
      searchLoading: false,
    };
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.updatePermissions();
    // setTitle(this.props.componentId, "Contacts");
  }

  navigationButtonPressed({buttonId}: {buttonId: string}) {
    if (buttonId === "save") {
      Navigation.dismissModal(this.props.componentId);
      this.props.onCompletion(this.state.selected);
    } else if (buttonId === "close") {
      Navigation.dismissModal(this.props.componentId);
      this.props.onCompletion(this.props.selected || []);
    }
  }

  updatePermissions = async () => {
    try {
      await requestPermissions("contacts");
      this.setState({permissionGranted: true, loading: true}, () => this.updateContacts());
    } catch (e) {
      Tracking.track("ContactPermissionDenied");
      this.setState({permissionGranted: false});
      Tracking.handleErrorAlert(`Error checking contacts permissions: ${e}`);
      return;
    }
  };

  updateContacts = async () => {
    let contacts: RNContact[];
    try {
      contacts = await Contacts.getContacts(false, this.state.search);
    } catch (e) {
      Tracking.handleErrorAlert(`Error fetching contacts: ${e}`);
      return;
    }
    contacts = contacts.filter(
      (c: RNContact) => c.phoneNumbers && c.phoneNumbers.length > 0 && c.givenName
    );
    const selectedIds = this.state.selected.map((c) => c.recordID);
    contacts = contacts
      .filter((c: RNContact) => !selectedIds.includes(c.recordID))
      .map((c: RNContact) => {
        return {...c, key: c.recordID};
      });
    contacts = sortBy(contacts, ["givenName", "familyName"]);

    // Update recent contacts
    let recentContacts: RNContact[] = [];
    if (this.props.recentContacts && this.props.recentContacts.length > 0) {
      const r = this.props.recentContacts
        .map((recordID: string) => contacts.find((c) => c.recordID === recordID))
        .filter((c: RNContact | undefined) => c && !selectedIds.includes(c.recordID));
      // TS doesn't understand we just filtered out the undefineds.
      recentContacts = r as RNContact[];
    }

    this.setState({contacts, recentContacts, loading: false, searchLoading: false});
  };

  renderNeedsPermissions() {
    return (
      <Box color="white" height="100%" padding={4}>
        <Box marginBottom={3}>
          <Text align="center">
            We need access to your contact list to let you select which contacts to text when you
            make it home safe.
          </Text>
        </Box>
        <Button
          color="primary"
          text="Add Contacts"
          onClick={() => requestPermissions("contacts").then(this.updatePermissions.bind(this))}
        />
      </Box>
    );
  }

  renderPermissionsDenied() {
    return (
      <Box color="white" height="100%">
        <Text>
          Sorry, you have denied contacts permissions. Please go to settings and enable the
          &ldquo;Contacts&rdquo; permission to continue.
        </Text>
      </Box>
    );
  }

  onPressContact = (contact: RNContact) => {
    let selected;
    const isSelected = Boolean(this.state.selected.find((c) => c.recordID === contact.recordID));

    if (isSelected) {
      Tracking.track("RemoveContact");
      selected = this.state.selected
        .slice()
        .filter((c: RNContact) => c.recordID !== contact.recordID);

      this.setState({selected}, () => this.updateContacts());
    } else {
      Tracking.track("AddContact");
      selected = this.state.selected.slice();
      // Ignore duplicate selects.
      if (selected.find((c) => c.recordID === contact.recordID)) {
        return;
      }
      selected.push(contact);
      const selectedIds = selected.map((c) => c.recordID);
      const contacts = this.state.contacts
        .filter((c) => !selectedIds.includes(c.recordID))
        .map((c) => ({...c, key: c.recordID}));
      this.setState({selected, contacts}, () => this.updateContacts());
    }
  };

  renderContact(contact: RNContact) {
    const isSelected = Boolean(this.state.selected.find((c) => c.recordID === contact.recordID));
    return (
      <Contact
        contact={contact}
        isSelected={isSelected}
        onPress={() => this.onPressContact(contact)}
      />
    );
  }

  renderSpinner() {
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator color={Unifier.theme["darkGray"]} size="large" />
      </View>
    );
  }

  renderContactPicker() {
    const sections =
      this.state.recentContacts.length > 0
        ? [
            {title: "Selected", data: this.state.selected},
            {title: "Recent", data: this.state.recentContacts},
            {title: "Contacts", data: this.state.contacts},
          ]
        : [
            {title: "Selected", data: this.state.selected},
            {title: "Contacts", data: this.state.contacts},
          ];
    return (
      <Box padding={2} color="white" height="100%">
        <Box paddingY={3}>
          <TextField
            onChange={(result) =>
              this.setState({search: result.value, searchLoading: true}, () =>
                this.updateContacts()
              )
            }
            value={this.state.search}
            placeholder="Search contacts"
            type="search"
            searching={this.state.searchLoading}
          />
        </Box>
        {this.state.loading === true && this.renderSpinner()}
        {this.state.loading === false && (
          <SectionList
            renderItem={(item: {item: RNContact}) => this.renderContact(item.item)}
            renderSectionHeader={({section: {title}}) => (
              <Box color="white">
                <Text weight="bold">{title}</Text>
              </Box>
            )}
            sections={sections}
            keyExtractor={(item, index) => String(index)}
          />
        )}
      </Box>
    );
  }

  render() {
    if (this.state.permissionGranted === null) {
      return this.renderNeedsPermissions();
    } else if (this.state.permissionGranted === false) {
      return this.renderPermissionsDenied();
    } else {
      return this.renderContactPicker();
    }
  }
}
