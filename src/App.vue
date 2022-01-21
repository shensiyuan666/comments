<template>
  <div id="app">
    <el-input type="textarea" rows="10" placeholder="请输入评论内容"  v-model="comment"></el-input>
    <el-button @click="addComment">添加评论</el-button>
    <h3>评论列表</h3>
    <el-button style="marginBottom:30px" v-show="this.commentList.length" @click="isShowAll=!isShowAll">{{this.isShowAll?'折叠':'展开'}}所有评论</el-button>
    {{this.commentList.length?'':'暂无评论，请添加第一条评论'}}
    <div v-for="item in commentList" :key="item.id" style="marginBottom:30px" v-show="isShowAll">
      <el-button @click="toggle(item.id)">{{item.isShow?'折叠':'展开'}}评论</el-button>
      <div v-show="item.isShow">
        <div>{{item.content}}</div>
        <a href="javascript:;" @click="showInput(item.id)">回复</a>
        <el-button @click="toggle1(item.id)" v-show="item.replyList.length">{{item.isShowReply?'折叠':'展开'}}回复</el-button>
        <div v-for="item1 in item.replyList" :key="item1.id" v-show="item.isShowReply">{{item1.content}}</div>
        <div v-show="item.isShowInput" style="display:flex">
          <el-input v-model="item.reply"></el-input>
          <el-button @click="addReply(item.id)">发送</el-button>
          <el-button @click="hiddenInput(item.id)">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      comment:'',
      commentList:[],
      isShowAll:true
    }
  },
  created(){
    let res=window.sessionStorage.getItem('commentList')
    this.commentList=JSON.parse(res)===null?[]:JSON.parse(res)
  },
  methods:{
    toggle(id){
      let index=this.commentList.findIndex(v=>v.id===id)
      this.commentList[index].isShow=!this.commentList[index].isShow
    },
    addComment(){
      if(this.comment.trim().length===0){
          this.$message({
          type:'error',
          message: '评论不能为空！'
        })
      }
      else{
        let id=this.commentList.length===0?0:this.commentList[0].id+1
        this.commentList.unshift({id:id,content:this.comment,isShow:true,isShowInput:false,replyList:[],      reply:'',isShowReply:true})
        window.sessionStorage.setItem('commentList',JSON.stringify(this.commentList))
        this.comment=''
      }
    },
    showInput(id){
      let index=this.commentList.findIndex(v=>v.id===id)
      this.commentList[index].isShowInput=true
    },
    addReply(id){
      let index=this.commentList.findIndex(v=>v.id===id)
      let rid=this.commentList[index].replyList.length===0 ? 0 : this.commentList[index].replyList[this.commentList[index].replyList.length-1].rid+1
      let reply=this.commentList[index].reply
      this.commentList[index].replyList.push({rid:rid,content:reply})
      this.commentList[index].isShowInput=false
      window.sessionStorage.setItem('commentList',JSON.stringify(this.commentList))
      this.commentList[index].reply=''
    },
    hiddenInput(id){
      let index=this.commentList.findIndex(v=>v.id===id)
      this.commentList[index].isShowInput=false
      this.commentList[index].reply=''
    },
    toggle1(id){
      let index=this.commentList.findIndex(v=>v.id===id)
      this.commentList[index].isShowReply=!this.commentList[index].isShowReply
    }
  }
}
</script>

<style>

</style>
