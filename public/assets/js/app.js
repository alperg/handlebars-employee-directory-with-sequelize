// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

  $(".btnDelete").on("click", function(event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax(`/api/employees/${id}`, {
      type: "DELETE"
    }).then(
      function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#exampleModal").on("show.bs.modal", function (event) {
    const modal = $(this);
    const button = $(event.relatedTarget);
    const type = button.data("type");

    if(type === "update") {
      const id = button.data("id");

      $.ajax(`/api/employees/${id}`, {
        type: "GET"
      }).then((data) => {
        console.log(data);
        modal.find(".modal-title").text("Update " + data.firstName);

        modal.find(".modal-body input#firstName").val(data.firstName);
        modal.find(".modal-body input#lastName").val(data.lastName);
        modal.find(".modal-body input#email").val(data.email);
        modal.find(".modal-body input#gender").val(data.gender);
        modal.find(".modal-body input#department").val(data.department);
        modal.find(".modal-body input#startDate").val(data.startDate);

        modal.find(".modal-footer .btnSubmit").on("click", function() {
          const updatedEmp = {
            firstName: modal.find(".modal-body input#firstName").val().trim(),
            lastName: modal.find(".modal-body input#lastName").val().trim(),
            email: modal.find(".modal-body input#email").val().trim(),
            gender: modal.find(".modal-body input#gender").val().trim(),
            department: modal.find(".modal-body input#department").val().trim(),
            startDate: modal.find(".modal-body input#startDate").val().trim()
          };
          $.ajax(`/api/employees/${id}`, {
            type: "PUT",
            data: updatedEmp
          }).then(() => {
              location.assign("/");
            }
          );
        });
      }); 
    } else {
      // Add
      modal.find(".modal-title").text("Add New Employee");

      modal.find(".modal-body input#firstName").val("");
      modal.find(".modal-body input#lastName").val("");
      modal.find(".modal-body input#email").val("");
      modal.find(".modal-body input#gender").val("");
      modal.find(".modal-body input#department").val("");
      modal.find(".modal-body input#startDate").val("");

      modal.find(".modal-footer .btnSubmit").on("click", function() {
        const newEmp = {
          avatar: "https://robohash.org/veritatisautemdolores.png?size=50x50&set=set1",
          firstName: modal.find(".modal-body input#firstName").val().trim(),
          lastName: modal.find(".modal-body input#lastName").val().trim(),
          email: modal.find(".modal-body input#email").val().trim(),
          gender: modal.find(".modal-body input#gender").val().trim(),
          department: modal.find(".modal-body input#department").val().trim(),
          startDate: modal.find(".modal-body input#startDate").val().trim()
        };
        $.ajax(`/api/employees`, {
          type: "POST",
          data: newEmp
        }).then(() => {
            location.assign("/");
          }
        );
      });
    }
  });

});
