import '../index.js';
import { EC2Client, DescribeRegionsCommand  } from "@aws-sdk/client-ec2";
describe('ping', function ()  {
    this.timeout(0)
    const client = new EC2Client();

    it('describe region', async ()=>{
        const params = {
            AllRegions:true
        };
        const command = new DescribeRegionsCommand (params);
        await client.send(command)
    })
});