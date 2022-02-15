import React, { Component } from 'react';
import PropTypes from "prop-types";
import qs from 'qs';

interface SteamLoginProps {
    onFailure: any;
    onSuccess: any;
    redirectUri?: any;
    realm?: any;
    cssClass?: any;
    buttonText?: any;
    children?: any;
    tag?: any;
    type?: any;
}

class SteamLogin extends Component<SteamLoginProps> {
  constructor(props) {
    super(props);
    this.onBtnClick = this.onBtnClick.bind(this);
  }

  componentDidMount() {
    const query = window.location.search.substring(1);
    if(!query)
      return null;
    const obj = qs.parse(query);
    if(obj["openid.mode"] === 'error') {
      this.props.onFailure(obj["openid.error"]);
    } else {
      this.props.onSuccess(obj);
    }
  }

  onBtnClick() {
    const redirectUri = this.props.redirectUri || window.location.href;
    const realm = this.props.realm || location.protocol + "//" + location.host;

    window.location.href = `https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=${redirectUri}&openid.realm=${realm}&openid.mode=checkid_setup`;
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
    return React.createElement(
      tag,
      {
        className: cssClass,
        onClick: this.onBtnClick,
        style: cssClass ? {} : style,
        type
      },
      children || buttonText
    );
  }
}

(SteamLogin as any).defaultProps = {
  buttonText: 'Login with Steam',
  scope: 'identify',
  tag: 'button',
  type: 'button'
};

(SteamLogin as any).propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  redirectUri: PropTypes.string,
  buttonText: PropTypes.string,
  cssClass: PropTypes.string,
  children: PropTypes.node,
  tag: PropTypes.string,
  realm: PropTypes.string,
  type: PropTypes.string
};

export default SteamLogin;
