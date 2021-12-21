const info = {
  name: "Sujal Duwa",
  address: "Baneshwor",
  emails: "sujalduwa@gmail.com",
  interests: ["Football", "Motorsports", "Coding"],
  education: [
    {
      name: "Trinity College",
      enrolledDate: 2017
    },
    {
      name: "Nobel Academy",
      enrolledDate: 2014
    }
  ]
};

info.education.forEach((value) => {
  console.log("Name: " + value.name + ", Date: " + value.enrolledDate);
});
