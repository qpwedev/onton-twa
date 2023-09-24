import { TonConnectButton } from "@tonconnect/ui-react";
import { Link, useNavigate } from "react-router-dom";
import { FlexBoxRow } from "../components/styled/styled";

import "./MainPage.css";
import { useContext, useState } from "react";
import { Schema } from "../types";
import { RoomContext } from "../contexts/RoomContext";
import { useTonConnect } from "../hooks/useTonConnect";

const serverUrl = "https://7a21-185-176-136-228.ngrok-free.app";

export default function MainPage() {
  const [enabledDots, setEnabledDots] = useState([-1, -1, -1, -1, -1, -1]);
  function isFilled() {
    return enabledDots.findIndex((el) => el === -1) === -1;
  }

  const { wallet } = useTonConnect();

  const navigate = useNavigate();

  const { setRoom } = useContext(RoomContext);

  if (isFilled()) {
    const password = enabledDots.join("");
    fetch(`${serverUrl}/room/password/${password}`, {
      method: "POST",
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: wallet,
      }),
    })
      .then((res) => res.json())
      .then((res: Schema) => {
        console.log(res);
        if (res.newRoom.id) {
          setRoom(res.newRoom);
          navigate(`/room/${res.newRoom.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="main-page-wrapper">
      <TonConnectButton />
      <div className="numpad">
        <Header enabledDots={enabledDots} />
        <NumPad setEnabledDots={setEnabledDots} />
      </div>
    </div>
  );
}

function Header({ enabledDots }: { enabledDots: number[] }) {
  return (
    <div className="numpad-header">
      <div className="enter-code-title">Enter Code</div>
      <Dots enabledDots={enabledDots} />
      <div className="main-page-create-link">
        <Link to="/create" className="create-new-room-link">Create new room</Link>
      </div>
    </div>
  );
}

function Dots({ enabledDots }: { enabledDots: number[] }) {
  return (
    <FlexBoxRow>
      <Circle enabled={enabledDots[0] !== -1} />
      <Circle enabled={enabledDots[1] !== -1} />
      <Circle enabled={enabledDots[2] !== -1} />
      <Circle enabled={enabledDots[3] !== -1} />
      <Circle enabled={enabledDots[4] !== -1} />
      <Circle enabled={enabledDots[5] !== -1} />
    </FlexBoxRow>
  );
}

function Circle({ enabled }: { enabled: boolean }) {
  return <div className={`circle ${enabled ? "enabled" : "disabled"}`}></div>;
}

function NumPad({ setEnabledDots }: { setEnabledDots: Function }) {
  function onClickHandler(e: any) {
    const target = e.target;
    if (target.classList.contains("grid-item")) {
      const num = target.innerHTML;
      setEnabledDots((prev: number[]) => {
        const next = [...prev];
        const nextIndex = next.findIndex((el) => el === -1);
        if (nextIndex !== -1) {
          next[nextIndex] = parseInt(num);
        }

        return next;
      });
    }
  }

  function erase() {
    setEnabledDots((prev: number[]) => {
      const next = [...prev];
      let lastAddedIndex = -1;
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i] !== -1) {
          lastAddedIndex = i;
          break;
        }
      }

      if (lastAddedIndex !== -1) {
        next[lastAddedIndex] = -1;
      }

      return next;
    });
  }

  return (
    <div className="grid-container">
      <div onClick={onClickHandler} className="grid-item">
        1
      </div>
      <div onClick={onClickHandler} className="grid-item">
        2
      </div>
      <div onClick={onClickHandler} className="grid-item">
        3
      </div>
      <div onClick={onClickHandler} className="grid-item">
        4
      </div>
      <div onClick={onClickHandler} className="grid-item">
        5
      </div>
      <div onClick={onClickHandler} className="grid-item">
        6
      </div>
      <div onClick={onClickHandler} className="grid-item">
        7
      </div>
      <div onClick={onClickHandler} className="grid-item">
        8
      </div>
      <div onClick={onClickHandler} className="grid-item">
        9
      </div>
      <div className="grid-item invisible"></div>
      <div onClick={onClickHandler} className="grid-item">
        0
      </div>
      <div onClick={erase} className="grid-item no-border">
        <img
          className="erase-icon"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABfklEQVR4nO2YQUrEMBSGv8XoTlxZRkapCz2BKJ7DlR5B1+pdFC8g4k4Xs/IM2gGPoBtBRd1ppPAWsXY6acl0kvo+CJThpeSbNn/SgKIoiqIo/5dFIANMAO0NuAI26kr0gGEAAqbQnoFBHZFT6fgIpMyeAXAtY7pw7XQsHT6ALcJhVcb14lK8C3wB38Ae4WGkVbIJvEvhEWFiJomkMh/yonPCxVSJLAB3UnALzBOhSM+K2UzWjiYcAIlDXSK1TRkr4iNmD60/okomsRbYvI83kRP58RPYoTlLwL3c6wFYdqjp+xLxHbNVMr4k/ojYMZsvfr4ok/Ep8UvEjtl8fvjGngdZ4dolDJxFRnIxlMRiyjI+JcaKzBGxSGq9WmdE/Gq1Odn7jtEcdPza6eRTxrS5IJZFrC8ZM2mL8hTzFqW4aRzFvGnszDa+Ux9W047l1kWKsbxPxCL2cVAey9tEehxUFstrzJ4V4EbGdNmVI9P1mA+xX+VJ1JZQFEVRFIXA+QERJEsxBXWh/AAAAABJRU5ErkJggg=="
        />
      </div>
    </div>
  );
}
