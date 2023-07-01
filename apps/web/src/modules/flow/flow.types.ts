export type FlowStep = {
  title: string;
  component: React.ComponentType;
};

export type Flow = {
  steps: FlowStep[];
};
