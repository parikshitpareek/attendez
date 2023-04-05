import moment from 'moment';
import TimeHandler from '../time-handler';

class AdminDataHandler {
  public static membersDataHandlers(membersData: any): any {
    let finalData: any = [];
    membersData.map((member: any, index: any) => {
      finalData.push({
        ...member,
        key: member.id,
        sno: index + 1,
        createdAt: TimeHandler.getDate(member.createdAt),
        updatedAt: TimeHandler.getDate(member.updatedAt),
      });
    });

    return finalData;
  }

  public static eventsDataHandler(eventsData: any): any {
    let finalData: any = [];
    eventsData.map((eventData: any) => {
      finalData.push({
        ...eventData,
        date: moment(eventData.date).format('ll'),
        time: moment(eventData.date).format('h:mm a'),
      });
    });

    return finalData;
  }

  public static usersDataHandler(usersData: any): any {
    let finalData: any = [];
    usersData.map((user: any, index: any) => {
      let tempObj = {
        key: user.id,
        id: user.id,
        name: user.name,
        email: user.email,
        sno: index + 1,
        rollNo: user.student.rollNo,
        year: user.student.year,
        active: user.active,
        imageLink: user.image,
        registeredEvents: user._count.Registeration,
        createdAt: TimeHandler.getDate(user.createdAt),
      };
      finalData.push(tempObj);
    });

    return finalData;
  }

  public static powersDataHandler(powersData: any): any {
    let finalData: any = [];
    powersData.map((user: any, index: any) => {
      let tempObj = {
        sno: index + 1,
        name: user.name,
        memberId: user.memberId,
        email: user.email,
        adminId: user.adminId,
        members: user.admin.members,
        users: user.admin.users,
        events: user.admin.events,
        forms: user.admin.forms,
        contacts: user.admin.contacts,
        bouncer: user.admin.bouncer,
      };
      finalData.push(tempObj);
    });

    return finalData;
  }

  public static contactsDataHandler(contactsData: any): any {
    let finalData: any = [];
    contactsData.map((contact: any, index: any) => {
      let tempObj = {
        ...contact,
        sno: index + 1,
        createdAt: TimeHandler.getDate(contact.createdAt),
      };
      finalData.push(tempObj);
    });

    return finalData;
  }
}

export default AdminDataHandler;
