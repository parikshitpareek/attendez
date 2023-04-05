import cosmic from 'cosmicjs';
import CosmicDataHandler from './data-handler';
const api = cosmic();
const bucket = api.bucket({
  slug: process.env.COSMIC_BUCKET_SLUG,
  read_key: process.env.COSMIC_READ_KEY,
});

class Cosmic {
  public static async membersDataFetcher(): Promise<any> {
    const data = await bucket.objects
      .find({
        type: 'teams',
      })
      .props('slug,title,content,metadata');

    let finalData = CosmicDataHandler.membersDataHandler(data);
    return finalData;
  }
}

export default Cosmic;
