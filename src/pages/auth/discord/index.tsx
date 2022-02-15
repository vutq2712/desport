import React, { Component } from 'react';
import PropTypes from 'prop-types';

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  const code = vars
    .map(i => {
      const pair = i.split('=');
      if (pair[0] === variable) {
        return pair[1];
      }

      return null;
    })
    .filter(d => !!d);

  return code[0];
}

interface DiscordLoginProps {
  implicitAuth: boolean;
  onFailure: any;
  onSuccess: any;
  clientId?: any;
  scope?: any;
  redirectUri?: any;
  cssClass?: any;
  buttonText?: any;
  children?: any;
  tag?: any;
  type?: any;
}

class DiscordLogin extends Component<DiscordLoginProps> {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentDidMount() {
    if (this.props.implicitAuth) {
      const matches = window.location.hash.match(/=(.*)/);
      if (matches) {
        const query = matches[1];
        const vars = query.split('&');
        const code = vars
          .map(i => {
            const pair = i.split('=');
            if (pair[0] === 'access_token') {
              return pair[1];
            }
            return null;
          })
          .filter(d => !!d);
        this.props.onSuccess(code[0]);
      }
    } else if (window.location.search.includes('code')) {
      this.props.onSuccess(getQueryVariable('code'));
    } else if (window.location.search.includes('error')) {
      this.props.onFailure({
        error: getQueryVariable('error'),
        error_reason: getQueryVariable('error_reason'),
        error_description: getQueryVariable('error_description')
      });
    }
  }

  onBtnClick() {
    const { clientId, scope } = this.props;
    const redirectUri = this.props.redirectUri || window.location.href;
    const responseType = this.props.implicitAuth ? 'token' : 'code';
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`
  }

  render() {
    const style = {
      display: 'inline-block',
      background: 'linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)',
      color: '#fff',
      width: 200,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 2,
      border: '1px solid transparent',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: '"proxima-nova", "Helvetica Neue", Arial, Helvetica, sans-serif'
    };
    const { cssClass, buttonText, children, tag, type } = this.props;
    const discordLoginButton = React.createElement(
      tag,
      {
        className: cssClass,
        onClick: this.onBtnClick,
        style: cssClass ? {} : style,
        type
      },
      children || buttonText
    );

    return discordLoginButton;
  }
}

(DiscordLogin as any).defaultProps = {
  buttonText: 'Login with Discord',
  scope: 'identify',
  tag: 'button',
  type: 'button',
  implicitAuth: false
};

(DiscordLogin as any).propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  scope: PropTypes.string,
  cssClass: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.string,
  redirectUri: PropTypes.string,
  type: PropTypes.string,
  implicitAuth: PropTypes.bool
};

export default DiscordLogin;
