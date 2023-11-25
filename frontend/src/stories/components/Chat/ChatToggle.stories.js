import React from 'react';
import { rest } from 'msw';
import ChatToggle from "main/components/Chat/ChatToggle";

export default {
    title: 'components/Chat/ChatToggle',
    component: ChatToggle
};

const [isChatOpen, setIsChatOpen] = useState(false);

const toggleChatWindow = () => {
setIsChatOpen((prevState) => !prevState);
};

const Template = (args) => {
    return (
        <ChatToggle {...args} />
    )
};

export const Message = Template.bind({});

Message.args = {
    toggleChatWindow: toggleChatWindow,
};