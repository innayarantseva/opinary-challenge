import React from "react";
import { createRoot } from "react-dom/client";
import { App, Configurations } from "./App";

type PollWidget = {
  q: any;
};

const pluginPoll = (window: Window) => {
  console.log("Poll is starting...");

  // set default configurations
  let configurations: Configurations = {
    question: "Is that really a poll?",
    answers: ["Yeah, definitely!", "Guess so...", "Nah, are you insane?!"],
  };

  // all methods that were called till now and stored in queue
  // needs to be called now

  // @ts-ignore
  let globalObject = window[window["PollWidget"]];

  // @ts-ignore
  let queue = globalObject.q;

  console.log(queue);

  if (queue) {
    for (var i = 0; i < queue.length; i++) {
      const methodName = queue[i][0].toLowerCase();

      if (methodName == "init") {
        configurations = { ...configurations, ...queue[i][1] };
        console.log("PollWidget started", configurations);

        let container = document.getElementById("app");

        if (!container) {
          container = document.createElement("div");
          container.setAttribute("id", "app");
          document.getElementsByTagName("body")[0].appendChild(container);
        }

        const root = createRoot(container);
        root.render(<App configurations={configurations} />);
      }
      // apiHandler(queue[i][0], queue[i][1]);
      else console.log(`Unknown api method: ${methodName}`);
    }
  }

  // override temporary (until the app loaded) handler
  // for widget's API calls
  //   globalObject = apiHandler;
  //   globalObject.configurations = configurations;
};

pluginPoll(window);
