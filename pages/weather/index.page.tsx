import Page from '@/components/layout/page';
import CustomHeading from '@/components/ui/custom-heading';
import api from '@/lib/api';
import { useState } from 'react';
import { Block, Button, Text, TextInput } from 'suomifi-ui-components';

export default function Weather() {
  const [isLoading, setLoading] = useState(false);
  const [ inputs ] = useState({ weather: { lon: 24.945831, lat: 60.192059 }});
  const [ outputs ] = useState({ weather: {}});

  const fetchWeather = () => {
    setLoading(true);
    api.testbedGW.getDataProduct('draft/Weather/Current/Metric', inputs.weather).then((res) => {
      outputs.weather = res;
      setLoading(false);
    });
  };

  return (
    <Page title="Weather">
      <Block variant="section" className="px-4 py-6 bg-white">
        <CustomHeading variant="h2" suomiFiBlue="dark">
          Check weather data
        </CustomHeading>

        <TextInput labelText="Longitude" value={inputs.weather.lon} />
        <TextInput labelText="Latitude" value={inputs.weather.lat} />

        <div className="flex flex-col mt-8 gap-6">
          <Text>
            Choose which service to use to log in to Living in Finland.
          </Text>
          <Button onClick={fetchWeather} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Check weather data'}
          </Button>
        </div>

        <div className="flex flex-col mt-8 gap-6">
          Results:
          <Text>
            {JSON.stringify(outputs.weather)}
          </Text>
        </div>

      </Block>

    </Page>
  );
}
