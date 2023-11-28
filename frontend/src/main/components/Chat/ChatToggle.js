import Button from "react-bootstrap/Button";
import ChatSymbol from "assets/ChatSymbol.png";

const chatContainerStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'lightblue',
    color: 'black',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  };

const ChatToggle = ({ toggleChatWindow}) => 
{
    
    return (
        <Button
            style={chatContainerStyle}
            onClick={toggleChatWindow}
            data-testid="ChatToggle"
        >
            <img src={ChatSymbol} style = {chatContainerStyle} alt = "Chat Symbol"/>
        </Button>
    );
}

export default ChatToggle;
