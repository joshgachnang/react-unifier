import * as React from "react";
import {ActivityIndicator, KeyboardTypeOptions, Platform, TextInput, View} from "react-native";
import {Box} from "./Box";
import {Icon} from "./Icon";
import {COLOR_MAP} from "./UnifiedCommon";
import {TextFieldProps} from "./UnifiedCommon";
import {WithLabel} from "./WithLabel";

interface TextFieldState {
  focused: boolean;
  height: number;
}

export class TextField extends React.Component<TextFieldProps, TextFieldState> {
  constructor(props: TextFieldProps) {
    super(props);
    this.state = {focused: false, height: props.height || 40};
  }

  keyboardMap = {
    date: "default",
    email: "email-address",
    number: "number-pad",
    decimal: "decimal-pad",
    password: "default",
    search: "default",
    text: "default",
    url: Platform.select({
      ios: "url",
      android: "default",
    }),
    username: "default",
  };

  textContentMap = {
    date: "none",
    email: "emailAddress",
    number: "none",
    decimal: "none",
    password: "password",
    search: "none",
    text: "none",
    url: Platform.select({
      ios: "URL",
      android: "none",
    }),
    username: "username",
  };

  renderIcon() {
    if (this.props.type !== "search") {
      return null;
    }
    if (this.props.searching === true) {
      return (
        <Box marginRight={4}>
          <ActivityIndicator color={Unifier.theme["primary"]} size="small" />
        </Box>
      );
    } else {
      return (
        <Box marginRight={2}>
          <Icon prefix="far" size={14} name="search" />
        </Box>
      );
    }
  }

  getBorderColor = () => {
    if (this.props.errorMessage) {
      return Unifier.theme.red;
    } else if (this.state.focused) {
      return Unifier.theme.blue;
    } else {
      return Unifier.theme.gray;
    }
  };

  getHeight = () => {
    if (this.props.grow) {
      return Math.max(40, this.state.height);
    } else if (this.props.multiline) {
      return "100%";
    } else {
      return 40;
    }
  };

  focus() {
    // Empty
  }

  render() {
    const type = this.props.type || "text";
    const keyboardType = this.keyboardMap[type];
    // let textContentType = this.textContentMap[this.props.type || "text"];
    const {errorMessage, ...props} = this.props;
    return (
      <WithLabel
        label={errorMessage}
        labelPlacement="after"
        labelColor={this.props.errorMessageColor || "red"}
        labelSize="sm"
      >
        <WithLabel {...props}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              // height: 40,
              // minHeight: this.getHeight(),
              minHeight: this.getHeight(),
              width: "100%",
              // Add padding so the border doesn't mess up layouts
              paddingHorizontal: this.props.paddingX || this.state.focused ? 10 : 14,
              paddingVertical: this.props.paddingY || this.state.focused ? 0 : 4,
              borderColor: this.getBorderColor(),
              borderWidth: this.state.focused && !this.props.errorMessage ? 5 : 1,
              borderRadius: 16,
              backgroundColor: Unifier.theme.white,
              overflow: "hidden",
            }}
          >
            {this.renderIcon()}
            <TextInput
              style={{
                flex: 1,
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 0,
                height: this.getHeight(),
                width: "100%",
                color: Unifier.theme.darkGray,
                fontFamily: "SourceSansPro-Regular",
                ...this.props.style,
              }}
              keyboardType={keyboardType as KeyboardTypeOptions}
              onChangeText={(text) => {
                this.props.onChange({value: text});
              }}
              value={this.props.value}
              // TODO: uncomment with upgrade to React 0.56.
              // textContentType={textContentType}
              placeholder={this.props.placeholder}
              placeholderTextColor={Unifier.theme.gray}
              secureTextEntry={type === "password"}
              editable={!this.props.disabled}
              autoCapitalize={type === "text" ? "sentences" : "none"}
              underlineColorAndroid="transparent"
              onFocus={() => this.setState({focused: true})}
              onBlur={() => this.setState({focused: false})}
              // For react-native-autofocus
              ref={(ref) => {
                if (this.props.inputRef) {
                  this.props.inputRef(ref);
                }
              }}
              onSubmitEditing={() => {
                if (this.props.onEnter) {
                  this.props.onEnter();
                }
                if (this.props.onSubmitEditing) {
                  this.props.onSubmitEditing();
                }
              }}
              onContentSizeChange={(event) => {
                if (!this.props.grow) {
                  return;
                }
                this.setState({height: event.nativeEvent.contentSize.height});
              }}
              blurOnSubmit={true}
              returnKeyType={
                type === "number" || type === "decimal" ? "done" : this.props.returnKeyType
              }
              autoFocus={this.props.autoFocus}
              multiline={this.props.multiline}
              numberOfLines={this.props.rows || 4}
            />
          </View>
        </WithLabel>
      </WithLabel>
    );
  }
}
