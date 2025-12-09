if (import.meta.env.FIREFOX || import.meta.env.CHROME) {
  browser.runtime.onInstalled.addListener((details) => {
    console.log("onInstalled", details);
    const {reason} = details;
    if (reason === "install" || import.meta.env) {
      browser.tabs.create({url: "welcome.html"});
    }
  });
}
