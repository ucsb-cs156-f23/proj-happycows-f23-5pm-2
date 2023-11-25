import React from 'react';
import ChatToggle from "main/components/Chat/ChatToggle";

export default {
    title: 'components/Chat/ChatToggle',
    component: ChatToggle
};


const Template = (args) => {
    return (
        <ChatToggle {...args} />
    )
};

const toggleChatWindow = () => {}

export const Message = Template.bind({});

Message.args = {
    toggleChatWindow: toggleChatWindow,
    isChatOpen: false
};