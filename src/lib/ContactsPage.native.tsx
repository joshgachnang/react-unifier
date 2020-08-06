import get from "lodash/get";
import * as React from "react";
import {SectionList, TouchableOpacity} from "react-native";
import {Contact} from "react-native-contacts";
import Permissions from "react-native-permissions";
import {withProfile} from "shared";
import {Box, Button, Icon, Text, TextField} from "unified";
import {modalCloseButton, requestPermissions, Tracking} from "../lib";

interface Props {
  db?: any;
  navigator?: any;
  users?: any;
  profile?: any;
  update?: any;
}

interface State {
  text: string;
  hasPermissions: string;
  permissionGranted: boolean | null;
  contacts: Contact[];
  selected: Contact[];
  search: string;
}

class ContactsPage extends React.Component<Props, State> {
  static options() {
    return {
      topBar: {
        leftButtons: [modalCloseButton()],
      },
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      text: "",
      hasPermissions: "",
      permissionGranted: null,
      contacts: [],
      selected: [],
      search: "",
    };
    // navButtonListeners(props);
  }

  componentDidMount() {
    this.updatePermissions();
    // this.props.navigation.setParams({
    //   onPressRightButton: () => this.props.navigation.navigate("NewTrigger"),
    // });
  }

  componentDidUpdate(prevProps: Props) {
    if (
      get(prevProps, "profile.contacts.length") &&
      get(prevProps, "profile.contacts.length") !== get(this.props, "profile.contacts.length")
    ) {
      this.setState({selected: this.props.profile.contacts});
    }
  }

  async updatePermissions() {
    let permissions;
    try {
      permissions = await Permissions.request("contacts");
    } catch (e) {
      Tracking.track("ContactPermissionError", {error: e});
      Tracking.handleErrorAlert(`Error checking contacts permissions: ${e}`);
      return;
    }
    if (permissions === "authorized") {
      // Go ahead and fetch contacts right away.
      this.setState({permissionGranted: true}, () => this.updateContacts());
    } else if (permissions === "denied") {
      Tracking.track("ContactPermissionDenied");
      this.setState({permissionGranted: false});
    }
  }

  async updateContacts() {
    // let contacts;
    // try {
    //   contacts = await getContacts(false, this.state.search);
    // } catch (e) {
    //   return Tracking.handleErrorWithAlert(`Error fetching contacts: ${e}`);
    // }
    // contacts = contacts.filter((c) => c.phoneNumbers && c.phoneNumbers.length > 0 && c.givenName);
    // let selectedIds = this.state.selected.map((c) => c.recordID);
    // contacts = contacts.filter((c) => !selectedIds.includes(c.recordID)).map((c) => {
    //   return {...c, key: c.recordID};
    // });
    // contacts = sortBy(contacts, ["givenName", "familyName"]);
    // this.setState({contacts});
  }

  updateFirestoreContacts(contacts: any) {
    if (!this.props.update || !this.props.profile) {
      return;
    }
    this.props.update("profiles", this.props.profile.id, {contacts});
  }

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

  renderContact(contact: Contact) {
    const isSelected = this.state.selected.find((c) => c.recordID === contact.recordID);
    let phoneNumber;
    // TODO: render each as their own entry.
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      phoneNumber = contact.phoneNumbers[0].number;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          let selected;
          if (isSelected) {
            Tracking.track("AddContact");
            selected = this.state.selected
              .slice()
              .filter((c: Contact) => c.recordID !== contact.recordID);
            this.setState({selected}, () => this.updateContacts());
          } else {
            Tracking.track("RemoveContact");
            selected = this.state.selected.slice();
            // Ignore duplicate selects.
            if (selected.find((c) => c.recordID === contact.recordID)) {
              return;
            }
            selected.push(contact);
            const selectedIds = selected.map((c) => c.recordID);
            const contacts = this.state.contacts
              .filter((c) => !selectedIds.includes(c.recordID))
              .map((c) => {
                return {...c, key: c.recordID};
              });
            this.setState({selected, contacts});
          }
          this.updateFirestoreContacts(selected);
        }}
      >
        <Box padding={2} display="flex" direction="row">
          <Box paddingX={4} paddingY={2}>
            <Icon prefix="fas" name={isSelected ? "minus-circle" : "plus-circle"} />
          </Box>
          <Box>
            <Text size="md">
              {contact.givenName} {contact.familyName}
            </Text>
            {phoneNumber && <Text size="sm">{phoneNumber}</Text>}
          </Box>
        </Box>
      </TouchableOpacity>
    );
  }

  renderContactPicker() {
    return (
      <Box padding={2} color="white" height="100%">
        <Box paddingY={3}>
          <TextField
            onChange={(result) =>
              this.setState({search: result.value}, () => this.updateContacts())
            }
            value={this.state.search}
            placeholder="Search contacts"
          />
        </Box>
        <SectionList
          data={this.state.selected}
          renderItem={(item: {item: Contact}) => this.renderContact(item.item)}
          renderSectionHeader={({section: {title}}) => (
            <Box color="white">
              <Text bold={true}>{title}</Text>
            </Box>
          )}
          sections={[
            {title: "Favorited", data: this.state.selected},
            {title: "All Contacts", data: this.state.contacts},
          ]}
          keyExtractor={(item, index) => item + index}
        />
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

// const Page = withFireStore(ContactsPage, ["users"], {profile: true});
// Page.navigationOptions = (params: any) => {
//   return {
//     title: "Contacts",
//   };
// };
export default withProfile(ContactsPage);
