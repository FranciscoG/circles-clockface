function settingsComponent(props) {
  // console.log(JSON.stringify(props));

  const { settings } = props;

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
          label={`Currently set to: ${settings.useCelsius === "true" ? "C°" : "F°"}`}
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

        {settings.weatherError && <Text>{settings.weatherError}</Text>}
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
