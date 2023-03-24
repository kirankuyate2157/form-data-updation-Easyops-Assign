$(document).ready(function () {
  // Retrieve data localstorage, if it exists
  var contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  console.log("Retrieved contacts data:", contacts);
  // Add a contact to the table
  $.each(contacts, function (index, contact) {
    var row = $("<tr></tr>");
    $("<td></td>").text(contact.name).appendTo(row);
    $("<td></td>").text(contact.contact).appendTo(row);
    $("<td></td>").text(contact.email).appendTo(row);
    $("<td></td>")
      .html(
        '<button class="delete-button" data-name="' +
          contact.name +
          '">Delete</button>'
      )
      .appendTo(row);
    $("#contacts-table tbody").append(row);
  });
  function addContact(contact) {
    // Check if contact already exists
    if (isContactExists(contact)) {
      alert("Contact with same name and contact number already exists!");
      return;
    }
    contacts.push(contact);

    // Add contact to the table
    var row = $("<tr></tr>");
    $("<td></td>").text(contact.name).appendTo(row);
    $("<td></td>").text(contact.contact).appendTo(row);
    $("<td></td>").text(contact.email).appendTo(row);
    $("<td></td>")
      .html(
        '<button class="delete-button" data-name="' +
          contact.name +
          '">Delete</button>'
      )
      .appendTo(row);
    $("#contacts-table tbody").append(row);

    // Clear the form fields
    $("#name").val("");
    $("#contact").val("");
    $("#email").val("");

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  // Check if a contact already exists
  function isContactExists(contact) {
    var exists = false;
    $.each(contacts, function (index, value) {
      if (value.name === contact.name && value.contact === contact.contact) {
        exists = true;
        return false; // Exit loop
      }
    });
    return exists;
  }

  // Search contacts by name
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#contacts-table tbody tr").filter(function () {
      $(this).toggle(
        $(this).find("td:first").text().toLowerCase().indexOf(value) > -1
      );
    });
  });

  // Delete a contact
  $("#contacts-table").on("click", ".delete-button", function () {
    var name = $(this).data("name");
    if (confirm("Are you sure you want to delete " + name + "?")) {
      $(this).closest("tr").remove();
      contacts = contacts.filter(function (contact) {
        return contact.name !== name;
      });
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  });

  // Sort contacts by name
  $("#contacts-table th:first").on("click", function () {
    var rows = $("#contacts-table tbody tr").get();
    rows.sort(function (a, b) {
      var nameA = $(a).children("td:first").text().toUpperCase();
      var nameB = $(b).children("td:first").text().toUpperCase();
      return nameA.localeCompare(nameB);
    });
    $.each(rows, function (index, row) {
      $("#contacts-table tbody").append(row);
    });
  });

  // submissions data
  $("#contact-form").on("submit", function (event) {
    event.preventDefault();
    var name = $("#name").val();
    var contact = $("#contact").val();
    var email = $("#email").val();
    var contactObj = {
      name: name,
      contact: contact,
      email: email,
    };
    addContact(contactObj);
  });
});
