import React from 'react';
import { Text, TextInput, View, ScrollView, Image } from 'react-native';
import { GetSessionTicket } from '../common/index';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';
import { Localizations, FormatDate } from '../../locales/i18n';
import { Button, Link, Card, CardSection, Spinner, ShowMessage, SetSessionTicket } from '../common';
import { connect } from 'react-redux';
import { ForgotPassword } from '../actions';
import { Actions } from 'react-native-router-flux';

const GLOBAL = require('../common/Globals');
const { container, imageStyle, textStyle, textInputStyle } = require('../styles/SwoqyStyles');

class ForgotPasswordScreen extends React.Component {
  state = {
    email: ''
  };

  _clickForgotPassword() {
    this.props.ForgotPassword({ email: this.state.email });
    //alert("Parola sıfırlama talebiniz iletilmiştir.\nLütfen e-postanızı kontrol ediniz.")
    //Actions.signInScreen();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.type == 'forgot_password_success') {
      if (nextProps.code == 404) {
        alert(Localizations('ForgotPasswordScreen.WrongEmail'))
      }
      else {
        if (nextProps.success == true) {
          alert(Localizations('ForgotPasswordScreen.MailSent'));
          Actions.startScreen();
        }
        else {
          alert(Localizations('ForgotPasswordScreen.MailError'))
        }
      }

    }
  }
  renderButton() {
    if (!this.props.loadingForgotPassword) {
      return <Button onPress={this._clickForgotPassword.bind(this)}>{Localizations('ForgotPasswordScreen.Send')}</Button>;
    }
    return <Spinner size="small" />;
  }

  renderForgotPasswordArea = () => {
    if (!this.props.loadingSetSetting2) {
      return (
        <View style={{
          flex: 1,
          alignContent: 'center',
        }}>

          <Card >
            <View>
              <Text 
              style={textStyle.settingStyle.general}
              keyboardType='email'
              >{Localizations('ForgotPasswordScreen.ResetPassword')}</Text>
            </View>

            <View style={[container.row.sb, { marginVertical: 5 }]}>
              <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={textStyle.settingStyle.security}>{Localizations('ForgotPasswordScreen.WriteEmail')}</Text>
                <Text style={textStyle.settingStyle.security}>{Localizations('ForgotPasswordScreen.SetNewPassword')}</Text>
              </View>
            </View>

            <View style={{
              borderBottomWidth: 0,
              margin: 5,
              padding: 5,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              borderColor: '#ddd',
              position: 'relative'
            }}>
              <TextInput
                placeholder={Localizations('SignIn.Email')}
                style={{
                  paddingRight: 5,
                  paddingLeft: 5,
                  fontSize: 16,
                  flex: 1,
                  backgroundColor: '#e5e9ed',
                  height: 50,
                }}
                value={this.state.email}
                onChangeText={email => this.setState({ email: email })}
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>

            <View style={{
              height: 60,
              margin: 5,
              padding: 5,
              justifyContent: 'flex-start',
              flexDirection: 'row',
              position: 'relative'
            }}>
              {this.renderButton()}

            </View>


          </Card>

        </View>
      );
    } else {
      return <Spinner style="large" />
    }
  }


  render() {

    return (
      <View style={{ flex: 1 }}>
        {/* <View style={{ height: 40 }}>
          <HF_01 title={Localizations('Global.ForgotPasswordScreen')} />
        </View> */}
        <View style={{ flex: 1, backgroundColor: 'white', padding: 20, }}>
          {this.renderForgotPasswordArea()}
        </View>
      </View>
    );
  }
}


const mapStateToProps = ({ signInScreenResponse }) => {
  const { loadingForgotPassword, code, success, type } = signInScreenResponse;
  return {
    loadingForgotPassword, code, success, type
  };
};



export default connect(mapStateToProps, { ForgotPassword })(ForgotPasswordScreen);
