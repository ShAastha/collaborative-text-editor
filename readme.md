# Building and running the app


## ARCHITECTURE and SYSTEM DESIGN

The system allows user to access a blank document which can be edited - the user can INSERT, DELETE, UPDATE data (data is not persisted, you get a blank editor if you refresh the page)

The system allows multiple users to access the same document and they can simultaneously edit the        document at different places and their changes will not be overwritten

Quill Js has been used to create this real time collaborative text editor

The design mainly focuses on communicating to the server the different places on the editor that the different users are editing and then sending those changes back to the other users of the editor

This problem is easily solved by Quill as it gives us access to `deltas` - they describe the changes in the editor which are communicated to the server

This solves one problem, the other problem of real time collaboration is solved by using the socket.io library which enable real-time, bi-directional communication between servers and clients

### Conflict resolution

Quill Js also solves the problem of conflict resolution using deltas as well as synchronously checking the editor for any updates. In case of changes to the editor, events are fired (in our case, the 'text-change' event is fired) with the details of the change, how the editor was before the change (previous state) and the source of the change (user/api). In our case, event will only be fired if the changes arise from the user and not the api
