class CosmicDataHandler {
  public static membersDataHandler(data: any) {
    let finalData: any = [];
    data.objects &&
      data.objects.map((member: any) => {
        let tempObj = {
          name: member.metadata.name,
          designation: member.metadata.designation,
          imageLink: member.metadata.imagelink && member.metadata.imagelink.url,
          linkedin: member.metadata.linkedin,
          github: member.metadata.github,
          email: member.metadata.email,
          rank: member.metadata.rank,
        };
        finalData.push(tempObj);
      });

    return finalData;
  }
}

export default CosmicDataHandler;
