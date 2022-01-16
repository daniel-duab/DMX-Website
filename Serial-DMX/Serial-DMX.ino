#include <DmxSimple.h>

void setup()
{
    Serial.begin(9600);
}

bool read_channels = false;

const uint16_t CHANNELS_SHORT = 0xFFFC;
const uint16_t VALUES_SHORT = 0xFFF3;
const uint16_t END_SHORT = 0xFFFE;

const int CHANNELS_ARRAY_LENGTH = 32;
const int VALUES_ARRAY_LENGTH = 32;

uint16_t channels[32] = {0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,
                         0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,
                         0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,
                         0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF};

uint16_t values[32] =   {0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,
                         0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,
                         0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,
                         0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF,0xFFFF};

//
// DATA FORMAT
// each byte actually a uint16_t, so 2 bytes or a short
// [CHANNELS_BYTE]
// [CHANNEL_BYTE] 1
// [CHANNEL_BYTE] 2
// ...
// [VALUES_BYTE]
// [VALUE_BYTE] 1
// [VALUE_BYTE] 2
// ...
// [END_BYTE]
//



int value = 0;
int channel;

void loop()
{
    uint8_t data_bytes[2] = {0x00, 0x00};
    uint16_t data_short = 0x0000;

    while (!Serial.available())
    
    Serial.readBytes(data_bytes, 2);
    data_short = data_bytes[0]*256+data_bytes[1];
    int channel_counter = 0;
    int value_counter = 0;
    if(data_short == CHANNELS_SHORT){
        for(int i=0; i<CHANNELS_ARRAY_LENGTH; i++){
            
            Serial.readBytes(data_bytes, 2);
            data_short = data_bytes[0]*256+data_bytes[1];
            
            if (data_short == VALUES_SHORT){
                break;
            } else {
                channels[i] = data_short;
                channel_counter++;
            }
        }
        for(int i=0; i<CHANNELS_ARRAY_LENGTH; i++){
            
            Serial.readBytes(data_bytes, 2);
            data_short = data_bytes[0]*256+data_bytes[1];
            
            if (data_short == END_SHORT){
                break;
            } else {
                values[i] = data_short;
                value_counter++;
            }
        }
    }
        for(int i=0; i<channel_counter; i++){
            DmxSimple.write(channels[i], values[i]);
            channels[i] = 0xFFFF;
            values[i] = 0xFFFF;
        }

        

}
