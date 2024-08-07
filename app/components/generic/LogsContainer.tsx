//@ts-nocheck

import { Console, Hook, Unhook } from "console-feed-optimized";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LogsContainer = () => {
  const [logs, setLogs] = useState([]);

  // run once!
  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => {
        // toast(JSON.stringify(log.data), {
        //   type: log.method,
        // });
        setLogs((currLogs) => [...currLogs, log]);
      },
      false
    );
    return () => Unhook(hookedConsole);
  }, []);

  return (
    <div className="w-80">
      <Console logs={logs} />
    </div>
  );
};

export default LogsContainer;
