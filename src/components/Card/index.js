/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';

export default class Card extends Component {
    getContainerClass() {
        return classnames('slds-card', this.props.className);
    }

    render() {
        const {
            actions,
            children,
            footer,
            iconName,
            iconTitle,
            style,
            title,
        } = this.props;

        return (
            <article className={this.getContainerClass()} style={style}>
                <div className="slds-card__header slds-grid">
                    <header className="slds-media slds-media_center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon iconName={iconName} title={iconTitle} size="small" />
                        </div>
                        <div className="slds-media__body">
                            <h2>
                                <span className="slds-text-heading_small">{title}</span>
                            </h2>
                        </div>
                    </header>
                    <div className="slds-no-flex">
                        {actions}
                    </div>
                </div>
                <div className="slds-card__body slds-card__body_inner">{children}</div>
                <footer className="slds-card__footer">{footer}</footer>
            </article>
        );
    }
}

Card.propTypes = {
    /** Class for custom styles */
    className: PropTypes.string,
    /** Object with the custom styles. The properties must be in camelCase naming
     convention (e.g. { backgroundColor: green }) */
    style: PropTypes.object,
    /** Actions are components such as button or buttonIcon. Actions are displayed in the header. */
    actions: PropTypes.node,
    /** The body of the component. In markup, this is everything in the body of the card */
    children: PropTypes.node,
    /** The footer can include text or another component */
    footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** The Lightning Design System name of the icon. Names are written in the
     format '\utility:down\' where 'utility' is the category, and 'down' is the
     specific icon to be displayed. The icon is displayed in the header to the left of the title */
    iconName: PropTypes.string.isRequired,
    /** The title can include text or another component, and is displayed in the header */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    /** The title that is showed when a user hover the icon */
    iconTitle: PropTypes.string,
};
