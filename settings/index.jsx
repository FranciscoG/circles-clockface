function settingsComponent(props) {
  // console.log(JSON.stringify(props));

  const settingsModel = {
    useCelsius: false,
    userAPIKey: { name: "" },
    weatherError: null
  };
  var { settings } = props;

  // make sure there are defaul settings
  settings = Object.assign({}, settingsModel, settings);
  console.log(JSON.stringify(settings));

  return (
    <Page>
      <Section
        title={
          <Text bold align="center">
            App Settings
          </Text>
        }
      />
      <Section
        title={
          <Text bold align="center">
            Weather
          </Text>
        }
      >
        <Text align="left">Temperature Unit: F° or C°</Text>
        <Toggle
          settingsKey="useCelsius"
          label={`Currently set to: ${settings.useCelsius ? "C°" : "F°"}`}
        />

        <Text align="left">
          In order to keep this clockface 100% free users will have to signup
          for a free{" "}
          <Link source="https://openweathermap.org/api">
            OpenWeatherMap API key
          </Link>
        </Text>
        <TextInput label="Enter OpenWeatherMap API key here:" settingsKey="userAPIKey" />

        <Text>{settings.userAPIKey.name || ""}</Text>

        {settings.weatherError && <Text>Weather API error: {settings.weatherError}</Text>}
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
