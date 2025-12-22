const Space = (props: { h?: number; w?: number }) => {
  const { h, w } = props;

  return <div style={{ height: `${h}px`, width: `${w}px` }} />;
};

export default Space;
