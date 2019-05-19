import React from "react";
import { Loading } from "./components/Loading";
import { DynamicImport } from "./index";

export const HomePage = props => (
  <DynamicImport load={() => import("./pages/Dashboard")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
export const LandingPage = props => (
  <DynamicImport load={() => import("./pages/Landing")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
export const Poll = props => (
  <DynamicImport load={() => import("./components/Poll")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
export const Onboarding = props => (
  <DynamicImport load={() => import("./components/Onboarding/index.js")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
export const Responses = props => (
  <DynamicImport load={() => import("./components/Poll/Responses")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
export const CreatePoll = props => (
  <DynamicImport load={() => import("./components/CreatePoll")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
export const Done = props => (
  <DynamicImport load={() => import("./components/Poll/Done")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
export const Error = props => (
  <DynamicImport load={() => import("./components/Error")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
export const AddTo = props => (
  <DynamicImport load={() => import("./components/Poll/AddSomeoneNew")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);
