import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Avatar } from "@chatscope/chat-ui-kit-react";
import { Link } from "react-router-dom";
import array5 from "../arrays/array5";
import array6 from "../arrays/array6";

function Body() {
  // the prompt will be send as a state to chat component

  return (
    <div dir="rtl" style={{ margin: "20px" }}>
      <div>
        <span className="section-title">شخصيات لتلاميذ السنة الخامسة</span>
        <div className="section-content">
          {array5.map((character) => (
            <Link
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "20px 10px",
                textDecoration: "none", // remove underline from the link
                color: "black", // change the link color
              }}
              to={`/${character.username}`} // set the path to /character.name
            >
              <div>
                <Avatar
                  src={character.pic}
                  name={character.name}
                  status="available"
                  size="lg"
                />
              </div>
              <div style={{ width: "92vw", marginRight: "10px" }}>
                <div>{character.name}</div>
                <div>{`${character.firstMessage
                  .split(" ")
                  .slice(0, 5)
                  .join(" ")}...`}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <span className="section-title">شخصيات لتلاميذ السنة السادسة</span>
        <div className="section-content">
          {array6.map((character) => {
            return (
              <Link
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  margin: "20px 10px",
                  textDecoration: "none", // remove underline from the link
                  color: "black", // change the link color
                }}
                to={`/${character.username}`} // set the path to /character.name
              >
                <div>
                  <Avatar
                    src={character.pic}
                    name={character.name}
                    status="available"
                    size="lg"
                  />
                </div>
                <div style={{ width: "92vw", marginRight: "10px" }}>
                  <div>{character.name}</div>
                  <div>{`${character.firstMessage
                    .split(" ")
                    .slice(0, 5)
                    .join(" ")}...`}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Body;
