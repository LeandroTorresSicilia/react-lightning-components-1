import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

const INITIALS_REGEX = /^[A-Z][A-Z]$/;

export default class Avatar extends Component {
    constructor(props) {
        super(props);
        /*isFirstRender state is in order to don't render nothing until the async 
        callbacks (onload and onerror) have been called*/
        this.state = {
            isFirstRender: true,
            isImageSrcValid: ''
        };
    }

    componentWillMount(props) {
        const img = new Image();
        img.onload = () => this.setState({
            isFirstRender: false, 
            isImageSrcValid: true
        });
        img.onerror = () => this.setState({
            isFirstRender: false, 
            isImageSrcValid: false
        });
        img.src = this.props.src
    }

    render() {
        const { 
            alt, 
            initials, 
            src,
            style, 
            title
        } = this.props;
        const { isFirstRender ,isImageSrcValid } = this.state;
        
        if (isFirstRender) {
            return null;
        } else {
            const isInitialsValid = INITIALS_REGEX.test(initials);
            
            if (initials && !isInitialsValid) {
                console.warn('initials prop is wrong')
            }

            return (
                <span className={ this.getAvatarClass() } style={ style } >
                    {   
                        /* This is a conditional render, first check that image exist 
                           in src, if true then render a <img> element, if not check 
                           that initials are provided, if true render a <abbr> element, 
                           if not then render a <Icon/> component */
                        isImageSrcValid ?
                            <img alt={ alt } src={ src } title={ title } /> :
                        initials && isInitialsValid ?
                            <abbr className="slds-avatar__initials slds-icon-standard-user" style={ style } title={ title }>{ initials }</abbr> :
                            <Icon { ...this.props } size="medium" variant="bare" />      
                    }
                </span>
            );
        }
    }

    getAvatarClass() {
        const { className, size, variant } = this.props;
        const { isImageSrcValid } = this.state;

        if (!isImageSrcValid && size) {
            console.warn('size prop only make sense if a valid image src is provided');
        } 

        return classnames('slds-avatar', {
            'slds-avatar_circle': !isImageSrcValid || variant,
            'slds-avatar_large': size === 'large' && isImageSrcValid,
            'slds-avatar_medium': (size === 'medium' || size === undefined) && isImageSrcValid,
            'slds-avatar_small': size === 'small' && isImageSrcValid,
            'slds-avatar_x-small': size === 'x-small' && isImageSrcValid
        }, className);
    }
}

Avatar.propTypes = {
    /** Avatar description. It usually is a person name. Can be used only if valid src is available */
    alt: PropTypes.string,
    /** Is the avatar source path. Its value is the relative URL to the image. It take precedence over the initilas and icon */
    src: PropTypes.string,
    /** If set to true make the avatar a circle. It only make sense if valid src is available because the fallback avatars are alredy a circle */
    variant: PropTypes.bool,
    /** Class for custom styles */
    className: PropTypes.string,
    /** The user initials. It only can have two letters (the first name and last name first letter in upper case). It take precedence over the icon */
    initials: PropTypes.string,
    /** The icon name. It have the less precedence. It take the following format: ‘sprite name:icon name’ e.g. ‘utility:add’ */
    iconName: PropTypes.string,
    /** The icon size. Can be used only if valid src is available */
    size: PropTypes.oneOf(['large', 'medium','small', 'x-small']),
    /** Object with the custom styles. The properties must be in camelCase naming convention (e.g. { backgroundColor: green }) */
    style: PropTypes.object,
    /** This is a description that is showed when a user hover the avatar */
    title: PropTypes.string
};

Avatar.defaultProps = {
    iconName: 'standard:user',
    variant: false
};