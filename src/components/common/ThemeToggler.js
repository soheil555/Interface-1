const ThemeToggler = () => {
  const toggleHandler = () => {
    let classList = document.querySelector("html").classList;
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
        id="bopis"
        defaultChecked
        onChange={toggleHandler}
      />
      <label htmlFor="bopis" className="on-off-toggle__slider" />
    </div>
  );
};
export default ThemeToggler;
