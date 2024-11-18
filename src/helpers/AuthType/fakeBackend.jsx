import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import * as url from "../url_helper";
import accessToken from "../jwt-token-access/accessToken";
import {
  chats,
  users as members,
} from "../../common/data";

let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@triblem.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

  mock.onPost(url.POST_FAKE_REGISTER).reply((config) => {
    const user = JSON.parse(config["data"]);
    users.push(user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });
  

  mock.onPost("/post-fake-login").reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      (usr) => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          resolve([200, validUser[0]]);
        } else {
          reject([
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/fake-forget-pwd").reply((config) => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/post-jwt-register").reply((config) => {
    const user = JSON.parse(config["data"]);
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      (usr) => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;
          const userName = user.name;

          // JWT AccessToken
          const tokenObj = { accessToken: token, username: userName }; // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj, ...user.name }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/post-jwt-profile").reply((config) => {
    const user = JSON.parse(config["data"]);

    const one = config.headers;

    let finalToken = one.Authorization;

    const validUser = users.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex;

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex((obj) => obj.uid === user.idx);

            //Update object's name property.
            users[objIndex].username = user.username;

            // Assign a value to locastorage
            localStorage.removeItem("authUser");
            localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

            resolve([200, "Profile Updated Successfully"]);
          } else {
            reject([400, "Something wrong for edit profile"]);
          }
        } else {
          reject([400, "Invalid Token !!"]);
        }
      });
    });
  });

  mock.onPost("/post-fake-profile").reply((config) => {
    const user = JSON.parse(config["data"]);

    const validUser = users.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          let objIndex;

          //Find index of specific object using findIndex method.
          objIndex = users.findIndex((obj) => obj.uid === user.idx);

          //Update object's name property.
          users[objIndex].username = user.username;

          // Assign a value to locastorage
          localStorage.removeItem("authUser");
          localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

          resolve([200, "Profile Updated Successfully"]);
        } else {
          reject([400, "Something wrong for edit profile"]);
        }
      });
    });
  });

  mock.onPost("/jwt-forget-pwd").reply((config) => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/social-login").reply((config) => {
    const user = JSON.parse(config["data"]);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;
          const userName = user.name;

          // JWT AccessToken
          const tokenObj = { accessToken: token, username: userName }; // Token Obj
          const validUserObj = { ...user[0], ...tokenObj, ...user.name }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });





  mock.onGet(url.GET_EVENTS).reply(() => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (events) {
      //     // Passing fake JSON data as response
      //     resolve([200, events]);
      //   } else {
      //     reject([400, "Cannot get events"]);
      //   }
      // });
    });
  });

  mock.onGet(url.SELECT_FOLDER).reply(() => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (mailDB.folders) {
      //     resolve([200, mailDB.folders]);
      //   } else {
      //     reject([400, "Cannot get folder"]);
      //   }
      // });
    });
  });

  mock.onPost(url.GET_MAILS_LIST).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // if (mailDB.allmail) {
        //   const configs = JSON.parse(config.data);
        //   const { params } = configs;

        //   let response = [];
        //   // Passing fake JSON data as response
        //   let folderHandle = params;

        //   if (!folderHandle) {
        //     folderHandle = 0;
        //   }

        //   if (folderHandle !== 6) {
        //     const folderId = mailDB.folders.find(folder => folder.id === folderHandle).id;
        //     response = mailDB.allmail.filter(mail => mail.folder === folderId);
        //   } else {
        //     response = mailDB.allmail.filter(mail => mail.starred === true);
        //   }

        //   resolve([200, response]);
        // if (mailDB.allmail) {
        //   // Passing fake JSON data as response
        //   resolve([200, mailDB.allmail]);
        // } else {
        //   reject([400, "Cannot get allmail"]);
        // }
      });
    });
  });

  mock.onPost(url.GET_SELECTED_MAILS).reply(selectedmails => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedmails && selectedmails.data) {
          const params = JSON.parse(selectedmails.data);
          const data = Object.keys(params).map(k => parseInt(params[k]));
          // Passing fake JSON data as response
          resolve([200, (data.length > 1) ? data : params[0]]);
        } else {
          reject([400, "Cannot add selected mails"]);
        }
      });
    });
  });

  mock.onPost(url.SET_FOLDER_SELECTED_MAILS).reply(request => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (request && request.data) {
      //     const data = JSON.parse(request.data);
      //     const { selectedmails, folderId } = data;
      //     mailDB.allmail = mailDB.allmail.map(mail => {
      //       if (selectedmails.includes(mail.id)) {
      //         return {
      //           ...mail,
      //           folder: parseInt(folderId)
      //         };
      //       }
      //       return mail;
      //     });

      //     resolve([200]);
      //   } else {
      //     reject([400, "Cannot add selected mails"]);
      //   }
      // });
    });
  });

  // mock.onPut(url.UPDATE_MAIL).reply((mail) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       if (mail && mail.data) {
  //         const data = JSON.parse(mail.data);

  //         mailDB.allmail = mailDB.allmail.map(mail => {
  //           if (mail.id === data.id) {
  //             return { ...mail, ...data };
  //           }
  //           return mail;
  //         });

  //         resolve([200, data]);
  //       } else {
  //         reject([400, "Cannot update mail data"]);
  //       }
  //     });
  //   });
  // });

  mock.onDelete(url.DELETE_MAIL).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as responses
          resolve([200, config.headers.mail]);
        } else {
          reject([400, "Cannot delete mail"]);
        }
      });
    });
  });

  mock.onDelete(url.TRASH_MAIL).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.mail]);
        } else {
          reject([400, "Cannot delete mail"]);
        }
      });
    });
  });

  mock.onDelete(url.STARED_MAIL).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.mail]);
        } else {
          reject([400, "Cannot delete mail"]);
        }
      });
    });
  });

  mock.onGet(new RegExp(`${url.GET_MAILS_ID}/*`)).reply((config) => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (mailDB.allmail) {
      //     // Passing fake JSON data as response
      //     const { params } = config;
      //     const email = mailDB.allmail.find(
      //       mails => mails.id.toString() === params.id.toString()
      //     );
      //     resolve([200, email]);
      //   } else {
      //     reject([400, "Cannot get invoice"]);
      //   }
      // });
    });
  });

  mock.onPost(url.ADD_NEW_USER).reply((user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot add user"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_USER).reply((user) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.data) {
          // Passing fake JSON data as response
          resolve([200, user.data]);
        } else {
          reject([400, "Cannot update user"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_USER).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.user]);
        } else {
          reject([400, "Cannot delete user"]);
        }
      });
    });
  });




  mock.onPost(url.ADD_NEW_EVENT).reply((event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot add event"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_EVENT).reply((event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_EVENT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CATEGORIES).reply(() => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (calenderDefaultCategories) {
      //     // Passing fake JSON data as response
      //     resolve([200, calenderDefaultCategories]);
      //   } else {
      //     reject([400, "Cannot get categories"]);
      //   }
      // });
    });
  });

  mock.onGet(url.GET_CHATS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (chats) {
          // Passing fake JSON data as response
          resolve([200, chats]);
        } else {
          reject([400, "Cannot get chats"]);
        }
      });
    });
  });

  mock.onGet(url.GET_GROUPS).reply(() => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (groups) {
      //     // Passing fake JSON data as response
      //     resolve([200, groups]);
      //   } else {
      //     reject([400, "Cannot get groups"]);
      //   }
      // });
    });
  });

  mock.onGet(url.GET_CONTACTS).reply(() => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (contacts) {
      //     // Passing fake JSON data as response
      //     resolve([200, contacts]);
      //   } else {
      //     reject([400, "Cannot get contacts"]);
      //   }
      // });
    });
  });

  mock.onGet(new RegExp(`${url.GET_MESSAGES}/*`)).reply((config) => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (messages) {
      //     // Passing fake JSON data as response
      //     const { params } = config;
      //     const filteredMessages = messages.filter(
      //       msg => msg.roomId === params.roomId
      //     );
      //     resolve([200, filteredMessages]);
      //   } else {
      //     reject([400, "Cannot get messages"]);
      //   }
      // });
    });
  });

  mock.onPost(url.ADD_MESSAGE).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config.data) {
          // Passing fake JSON data as response
          resolve([200, config.data]);
        } else {
          reject([400, "Cannot add message"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_MESSAGE).reply(config => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.data])
        } else {
          reject([400, "Cannot delete event"])
        }
      })
    })
  })




  mock.onGet(url.GET_CUSTOMERS).reply(() => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (customerData) {
      //     // Passing fake JSON data as response
      //     resolve([200, customerData]);
      //   } else {
      //     reject([400, "Cannot get customers data"]);
      //   }
      // });
    });
  });

  mock.onPost(url.ADD_NEW_CUSTOMER).reply((customer) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (customer && customer.data) {
          // Passing fake JSON data as response
          resolve([200, customer.data]);
        } else {
          reject([400, "Cannot add customer"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_CUSTOMER).reply((customer) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (customer && customer.data) {
          // Passing fake JSON data as response
          resolve([200, customer.data]);
        } else {
          reject([400, "Cannot update customer"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_CUSTOMER).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.customer]);
        } else {
          reject([400, "Cannot delete customer"]);
        }
      });
    });
  });


  mock.onGet(url.GET_USERS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (members) {
          // Passing fake JSON data as response
          resolve([200, members]);
        } else {
          reject([400, "Cannot get users"]);
        }
      });
    });
  });

  mock.onGet(url.GET_USER_PROFILE).reply(() => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   if (userProfile) {
      //     // Passing fake JSON data as response
      //     resolve([200, userProfile]);
      //   } else {
      //     reject([400, "Cannot get user profile"]);
      //   }
      // });
    });
  });

  mock.onGet(new RegExp(`${url.GET_DASHBOARD_EMAILCHART}/*`)).reply((config) => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   const { param } = config;
      //   if (dahsboardEmail) {
      //     const filterChart = dahsboardEmail.filter((item) => {
      //       return item.id === param;
      //     });

      //     const data = filterChart.map((item) => item[param]);
      //     // Passing fake JSON data as response
      //     resolve([200, data[0]]);
      //   } else {
      //     reject([400, "Cannot get dashaboard"]);
      //   }
      // });
    });
  });

  mock.onGet(new RegExp(`${url.TOP_SELLING_DATA}/*`)).reply((config) => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   const { params } = config;
      //   if (TopSellingData) {
      //     const filterChart = TopSellingData.filter((item) => {
      //       return item.id === params.month;
      //     });

      //     const data = filterChart.map((item) => item[params.month]);
      //     // Passing fake JSON data as response
      //     resolve([200, data[0]]);
      //   } else {
      //     reject([400, "Cannot get selling data"]);
      //   }
      // });
    });
  });


  mock.onGet(new RegExp(`${url.GET_VISITOR_DATA}/*`)).reply(config => {
    return new Promise((resolve, reject) => {
      // setTimeout(() => {

      //   const { params } = config;
      //   if (visitor) {
      //     const filteredVisitors = visitor.filter((msg) => msg.id === params.roomId);
      //     // Passing fake JSON data as response
      //     resolve([200, filteredVisitors]);
      //   } else {
      //     reject([400, "Cannot get visitor data"]);
      //   }
      // });
    });
  });


  mock.onPost(new RegExp(`${url.ON_ADD_REPLY}/*`)).reply((config) => {
    return new Promise((resolve, reject) => {
      const { data } = config;
      const { params } = JSON.parse(data);

      // setTimeout(() => {
      //   if (productComments) {
      //     const modifiedComments = [...productComments];
      //     const commentIdx = (modifiedComments || []).findIndex(
      //       (comment) =>
      //         comment.commentId.toString() === params.commentId.toString()
      //     );
      //     const today = new Date();
      //     const mins = today.getMinutes();
      //     if (commentIdx > -1) {
      //       var newReplyId = 1;
      //       if (
      //         modifiedComments[commentIdx]["replies"] &&
      //         modifiedComments[commentIdx]["replies"].length
      //       ) {
      //         const totalReplies = modifiedComments[commentIdx]["replies"];
      //         newReplyId = totalReplies[totalReplies.length - 1] + 1;
      //         const replyObj = {
      //           commentId: params.commentId,
      //           replyId: newReplyId,
      //           user: {
      //             name: "Admin",
      //             profile: "avatar1",
      //           },
      //           comment: params.replyText,
      //           time: `${mins} mins ago`,
      //           hasLiked: false,
      //         };
      //         modifiedComments[commentIdx]["replies"].push({ ...replyObj });
      //         modifiedComments[commentIdx]["showAddComment"] = false;
      //       } else {
      //         modifiedComments[commentIdx]["replies"] = [];
      //         const replyObj = {
      //           commentId: params.commentId,
      //           replyId: newReplyId,
      //           user: {
      //             name: "Admin",
      //             profile: "avatar1",
      //           },
      //           comment: params.replyText,
      //           time: `${mins} mins ago`,
      //           hasLiked: false,
      //         };
      //         modifiedComments[commentIdx]["replies"].push({ ...replyObj });
      //       }
      //     }

      //     // Passing fake JSON data as response
      //     resolve([200, modifiedComments]);
      //   } else {
      //     reject([400, "Cannot add comment"]);
      //   }
      // });
    });
  });

  mock.onPost(new RegExp(`${url.ON_ADD_COMMENT}/*`)).reply((config) => {
    return new Promise((resolve, reject) => {
      const { data } = config;
      const { params } = JSON.parse(data);

      // setTimeout(() => {
      //   if (productComments) {
      //     const modifiedComments = [...productComments];

      //     const today = new Date();
      //     const mins = today.getMinutes();
      //     const commentObj = {
      //       commentId: modifiedComments.length + 1,
      //       user: {
      //         name: "Admin",
      //         profile: "avatar1",
      //       },
      //       comment: params.commentText,
      //       time: `${mins} mins ago`,
      //       hasLiked: false,
      //     };
      //     modifiedComments.push({ ...commentObj });
      //     productComments.push({ ...commentObj });

      //     // Passing fake JSON data as response
      //     resolve([200, modifiedComments]);
      //   } else {
      //     reject([400, "Cannot add comment"]);
      //   }
      // });
    });
  });
};

export default fakeBackend;
