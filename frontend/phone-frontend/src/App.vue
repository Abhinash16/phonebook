<template>
  <div id="app">
    <div class="jumbotron text-center">
    <a href="http://localhost:8080/">PHONEBOOK</a>
    </div>

  <div class="container text-center controller" v-show="showAddOption"> 
          <button class="btn btn-primary" v-on:click="showform = !showform">Add Contact</button>
          <button class="btn btn-primary" v-on:click="addgroup = !addgroup">Add Group</button>
           <button class="btn btn-primary" v-on:click="manageGroup">Manage Group</button>
  </div>

  <div v-show="showform" class="container text-center">
    <form  class="form-inline">
      <label for="name">Name:</label><input v-model="name" placeholder="name" class="form-control" id="name">
      <label for="phone">Phone:</label><input v-model="phone" type="number" placeholder="phone" class="form-control" id="phone">
      <label for="email">Email:</label><input v-model="email" placeholder="email" class="form-control" id="email"><br>
      <label for="company">Company:</label><input v-model="company" placeholder="company" class="form-control" id="company">
      <label for="group">Group:</label>
      <select class="form-control" id="group" v-model="groupSelected">
        <option disabled value="">Please select one</option>
        <option v-for="group in groups">{{group.name}}</option>
      </select>

      <button v-on:click="addContact" class="btn btn-primary control">Save +</button>
    </form>
  </div>

  <div class="container text-center controller" v-show="addgroup">
    <label for="group">Group</label><input v-model="groupname" placeholder="new group" class="form-control" id="group">
    <button v-on:click="addGroup" class="btn btn-primary">ADD</button>
    <button v-on:click="addgrouppanel = false" class="btn btn-danger">Cancel</button>
  </div>

  <div class="container text-center controller">
    <ul v-show="showquestion">
      <li v-for="data in datas">{{data.name}}
        <p>phone: {{data.phone}}</p>
        <button v-on:click="view(data._id)" class="btn btn-primary">View Contact</button>
        <button v-on:click="chop(data._id)" class="btn btn-danger">Delete</button>
        <hr>
      </li>
    </ul>
  </div>

  <div v-show="displayedit" class="container text-center">
    <form  class="form-inline">
      <label for="name">Name:</label><input v-model="questionWithId.name"  class="form-control" id="name">
      <label for="phone">Phone:</label><input v-model="questionWithId.phone" type="number"  class="form-control" id="phone">
      <label for="email">Email:</label><input v-model="questionWithId.email" class="form-control" id="email"><br>
      <label for="company">Company:</label><input v-model="questionWithId.company"  class="form-control" id="company">
      <label for="group">Group:</label>
      <select class="form-control" id="group" v-model="questionWithId.group">
      <option disabled value="">Please select one</option>
      <option v-for="group in groups">{{group.name}}</option>
      </select><br>

      <button v-on:click="update(questionWithId._id)" class="btn btn-primary control">Update</button>
    </form>
  </div>
      
  <div v-show="particular" class="container text-center display">
    <p>Name: {{questionWithId.name}}</p>
    <p>Phone: {{questionWithId.phone}}</p>
    <p>Group: {{questionWithId.group}}</p>
    <p>Email: {{questionWithId.email}}</p>
    <p>Company: {{questionWithId.company}}</p>

    <button v-on:click="displayedit = !displayedit" class="btn btn-primary">Edit</button>
    <button v-on:click="chop(questionWithId._id)" class="btn btn-danger">Delete</button>
  </div>

  <div v-show="groupmanage" class="container text-center display" v-for="group in groups">{{group.name}}
    <div v-show="displaygroupedit" class="container text-center">
      <form  class="form-inline">
        <label for="name">Name:</label><input v-model="group.name"  class="form-control" id="name">
        <button v-on:click="updategroup(group._id)" class="btn btn-primary control">Update</button>
      </form>
    </div>

    <button v-on:click="displaygroupedit = !displaygroupedit" class="btn btn-primary">Edit</button>
    <button v-on:click="chopgroup(group._id)" class="btn btn-danger">Delete</button>
  </div>
</div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
   data(){
    return {
      datas: [],
      questionWithId:[],
      particular:false,
      showquestion: true,
      name:'',
      email:'',
      phone:'',
      company:'',
      groupSelected:'',
      showform:false,
      groups:[],
      addgroup : false,
      groupname: '',
      showAddOption: true,
      displayedit:false,
      displaygroupedit: false,
    }
  },
  created(){
      this.$http.get('http://localhost:8080/api/contacts/')
      .then(response=>{
        this.datas = response.body;
      });

      this.$http.get('http://localhost:8080/api/group/')
      .then(response=>{
        this.groups = response.body;
      })
    },
  methods:{
    view: function(id){
      this.showquestion = false;
      this.showAddOption= false;
      this.particular = true,

      this.$http.get('http://localhost:8080/api/contacts/' + id)
      .then(response=>{
      this.questionWithId = response.body;
      })
    },
    manageGroup: function(id){
      this.showquestion = false;
      this.groupmanage = true,

      this.$http.get('http://localhost:8080/api/contacts/' + id)
      .then(response=>{
      this.groups = response.body;
      })
    },
    chop: function(id){
      this.$http.delete('http://localhost:8080/api/contacts/' + id)
      .then(response=>{
      this.datas = response.body;
      })
    },
    chopgroup: function(id){
      this.$http.delete('http://localhost:8080/api/group/' + id)
      .then(response=>{
      this.data = response.body;
      })
      alert('Group Deleted, please refresh')
    },
    addContact: function(){
      this.$http.post('http://localhost:8080/api/contacts/',{
      name: this.name,
      email: this.email,
      phone: this.phone,
      company: this.company,
      group: this.groupSelected
      })
      .then(response=>{
      this.datas = response.body;
      })
      alert('Contact Added')
    },
    addGroup: function(){
      this.$http.post('http://localhost:8080/api/group/',{
      name: this.groupname,
      })
      then(response=>{
      this.data = response.body;
      })
      alert('Group Added.')
    },
    update: function(id){
      this.$http.put('http://localhost:8080/api/contacts/' + id,{
      name: this.questionWithId.name,
      email: this.questionWithId.email,
      phone: this.questionWithId.phone,
      company: this.questionWithId.company,
      group: this.questionWithId.groupSelected
      })
      .then(response=>{
      this.questionWithId = response.body;
      console.log(this.questionWithId)
      })
      alert('Contact Updated Sucessfully')
    
    },
     updategroup: function(id){
      this.$http.put('http://localhost:8080/api/group/' + id,{
      name: this.group.name,
      })
      .then(response=>{
      this.groups = response.body;
      })
      alert('Group has been updated Sucessfully')
    
    }
  }
}
</script>

<style>
.controller button{
  margin: 5px 5px 5px 5px;
}
.controller ul{
  margin: 15px 15px 15px 15px;
  border: 1px solid black;
}
.controller li{
  margin: 10px 10px 10px 10px;
}
.form-inline input{
  margin: 5px 5px 5px 5px;
}
.form-inline{
   margin-top: 10px;
  padding: 10px 10px 10px 10px;
}
.display{
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px 10px 10px 10px;

}
.display button{
  margin: 5px 5px 5px 5px;

}
.control{
  margin: 5px 5px 5px 5px;
}
</style>
