import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserInfo from "./UserInfo.component";
import Channels from "./Channels.component";
import PrivateChat from "./PrivateChat.component";
import FavouriteChannels from "./FavouriteChannels.component";

import "./SideBar.css";

export const SideBar = () => {
    return (<Menu vertical fixed="left" borderless size="large" className="side_bar">
        <UserInfo />
        <FavouriteChannels />
        <Channels />
        <PrivateChat />
    </Menu>
    )
}