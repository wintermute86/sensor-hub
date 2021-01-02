#include <DHT.h>
#include <ESP8266WiFi.h>
extern "C"
{
#include "user_interface.h"
}

#define DHTPIN 2
#define DHTTYPE DHT22
#define debug false
#define sleepTime 60 //determines how often esp falls into deep sleep

DHT dht(DHTPIN, DHTTYPE);
IPAddress serverIP(); //db server ip e.g. (192, 168, 0, 1)
WiFiClient client;

const char *ssid = "";     //network ssid
const char *password = ""; //network password
const unsigned int deviceID = ESP.getChipId();

void setup()
{
  Serial.begin(74880);
  Serial.print("\nConnecting to ");
  Serial.print(ssid);
  WiFi.persistent(false);
  WiFi.begin(ssid, password);
  while (!WiFi.isConnected())
  {
    Serial.print(".");
    delay(1000);
  }
  Serial.print("\n********");
  Serial.print("\nConnected to: ");
  Serial.print(ssid);
  Serial.print("\nIP address: ");
  Serial.print(WiFi.localIP());

  if (debug)
  {
    Serial.print("\ntimestamp: ");
    Serial.println(millis());
    Serial.print("\nmemory: ");
    Serial.println(system_get_free_heap_size());
  }

  dht.begin();
  uploadData(getTemp(), getHumidity());

  delay(2000); //this is to make sure the post goes out

  ESP.deepSleep(120 * 1000000);
}

void loop()
{
}

float getTemp()
{
  float temperature = dht.readTemperature();

  if (isnan(temperature))
  {
    Serial.println("\nFailed to read temperature from the DHT sensor!");
    return 0.0;
  }

  Serial.print("\nTemperature: ");
  Serial.print(temperature);
  Serial.print(" *C");
  Serial.print("\n");

  return temperature;
}

float getHumidity()
{
  float humidity = dht.readHumidity();

  if (isnan(humidity))
  {
    Serial.println("\nFailed to read humidity from the DHT sensor!");
    return 0.0;
  }

  Serial.print("\nHumidity: ");
  Serial.print(humidity);
  Serial.print("%");
  Serial.print("\n");

  return humidity;
}

void uploadData(float temperature, float humidity)
{

  if (client.connect(serverIP, 3000))
  {
    Serial.print("\n********");
    Serial.print("\nUploading data...");

    // Construct API request body
    String body = "{\"temperature\":" + String(temperature) + ", \"humidity\": " + String(humidity) + ", \"device\": " + String(deviceID) + "}";

    client.print("POST /api/temperature HTTP/1.1\n");
    client.print("Host: ");
    client.print(serverIP);
    client.print(":3000\n");
    client.print("Content-Type: application/json\n");
    client.print("Content-Length: ");
    client.print(body.length());
    client.print("\n\n");
    client.print(body);
    client.print("\n\n");

    client.print("POST /api/humidity HTTP/1.1\n");
    client.print("Host: ");
    client.print(serverIP);
    client.print(":3000\n");
    client.print("Content-Type: application/json\n");
    client.print("Content-Length: ");
    client.print(body.length());
    client.print("\n\n");
    client.print(body);
    client.print("\n\n");

    if (debug)
    {
      Serial.print("\n********");
      Serial.print("\nServer response:");
      while (client.connected() || client.available())
      {
        if (client.available())
        {
          String line = client.readStringUntil('\n');
          Serial.println(line);
        }
      }
    }
  }
  client.stop();
}
