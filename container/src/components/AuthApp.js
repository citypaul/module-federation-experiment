import React, { useRef, useEffect } from "react";
import { mount } from "auth/AuthApp";
import { useHistory } from "react-router-dom";

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname, // in memory router in child app needs to know the initial route
      onNavigate: ({ pathname: nextPathName }) => {
        const { pathname } = history.location;

        if (pathname != nextPathName) {
          history.push(nextPathName);
        }
      },
      onSignIn: () => {
        onSignIn();
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
