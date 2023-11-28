import Button from "react-bootstrap/Button";

const chatButtonStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'lightblue',
    color: 'black',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  };


const ChatToggle = ({ toggleChatWindow, isChatOpen }) => 
{
    return (
        <Button
            style={chatButtonStyle}
            onClick={toggleChatWindow}
            data-testid="ChatToggle"
        >
            {!isChatOpen? '▲' : '▼'}
        </Button>
    );
}

export default ChatToggle;
