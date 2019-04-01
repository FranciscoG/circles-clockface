function settingsComponent(props) {
  console.log(JSON.stringify(props));
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
            Weather API key
          </Text>
        }
      >
        <Text align="left">
          In order to keep this clockface 100% free users will have to signup for a free <Link source="https://openweathermap.org/api">OpenWeatherMap API key</Link>
        </Text>
        <TextInput
          label="OpenWeatherMap API key"
          settingsKey="userAPIKey"
        />
        <Text>{props.settingsStorage.userAPIKey || ''}</Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(settingsComponent);
