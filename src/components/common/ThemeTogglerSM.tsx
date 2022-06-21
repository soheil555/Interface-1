const ThemeTogglerSM = () => {
  const toggleHandler = () => {
    let classList = (document.querySelector("html") as HTMLElement).classList;
    if (classList.contains("light-mode")) {
      classList.remove("light-mode");
      classList.add("dark-mode");
    } else {
      classList.add("light-mode");
      classList.remove("dark-mode");
    }
  };
  return (
    <div className="on-off-toggle">
      <input
        className="on-off-toggle__input"
        type="checkbox"
        id="bopis2"
        onChange={toggleHandler}
        defaultChecked
      />
      <label htmlFor="bopis2" className="on-off-toggle__slider" />
    </div>
  );
};
export default ThemeTogglerSM;
