<template>
    <div class="space-y-4">
      <div v-for="comment in commentsArray" :key="comment.id" class="flex flex-col space-x-4">
        <div class="flex-1">
          <div class="flex justify-between">
            <h3 class="text-lg font-medium"><AuthorName :creatorId="parseInt(comment.creatorId)"></AuthorName></h3>
            <span class="text-sm text-gray-500">{{comment.createdAt.split('T')[0]}}</span>
          </div>
          <p class="text-gray-700">{{ comment.content }}</p>
          <div class="flex flex-row gap-2" v-if="user.isLogged">
            <button @click="showReplyForm(comment.id)" class="text-orange-500 hover:underline focus:outline-none">Reply</button>
            <button  v-if="comment.creatorId == user.id" @click="deleteUserComment(comment.id)" class=" text-orange-500 hover:underline focus:outline-none">Delete</button>
            <button  v-if="comment.creatorId == user.id" @click="showEditComment(comment.id)" class=" text-orange-500 hover:underline focus:outline-none">Edit</button>
        </div>
          <form v-if="comment.id === editCommentForm.originalCommentId" @submit.prevent="editUserComment" class="mt-4 flex space-x-4">
            <div class="flex-1">
              <div class="flex items-center space-x-4">
                <input v-model="editCommentForm.newContent" type="text" class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white" placeholder="Edit a Comment..." required>
              </div>
              <button type="submit" class="mt-2 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600">Edit Comment</button>
            </div>
          </form> 
        </div>
        <div class="mt-4 space-y-4 flex flex-col">
            <div v-for="reply in comment.commentReplies" :key="reply.id" class="flex space-x-4">
              <div class="flex-1">
                <div class="flex justify-between">
                    <h4 class="text-base font-medium"><AuthorName :creatorId="parseInt(reply.creatorId)"></AuthorName> </h4>
                  <span class="text-sm text-gray-500">{{reply.createdAt.split('T')[0]}}</span>
                </div>
                <p class="text-gray-700">{{ reply.content }}</p>
                <button v-if="comment.creatorId == user.id && user.isLogged" @click="deleteUserReply(reply.id)" class=" text-orange-500 hover:underline focus:outline-none">Delete</button>
                <button v-if="comment.creatorId == user.id && user.isLogged" @click="showEditReply(reply.id)" class=" text-orange-500 hover:underline focus:outline-none">Edit</button>
            </div>
              <form v-if="reply.id === editReplyForm.originalReplyId" @submit.prevent="editUserReply" class="mt-4 flex space-x-4">
            <div class="flex-1">
              <div class="flex items-center space-x-4">
                <input v-model="editReplyForm.newContent" type="text" class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white" placeholder="Edit a reply..." required>
              </div>
              <button type="submit" class="mt-2 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600">Edit reply</button>
            </div>
          </form> 
            </div>
          </div>
          
          <form v-if="comment.id === replyForm.parentId" @submit.prevent="addCommentReply" class="mt-4 flex space-x-4">
            <div class="flex-1">
              <div class="flex items-center space-x-4">
                <input v-model="replyForm.content" type="text" class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white" placeholder="Add a reply..." required>
              </div>
              <button type="submit" class="mt-2 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600">Post reply</button>
            </div>
          </form>
        </div>
        
        <form @submit.prevent="addComment" class="flex space-x-4">
        <div class="flex-1">
            <div class="flex items-center space-x-4">
                <input v-model="userComment" type="text" class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white" placeholder="Add a comment..." required>
            </div>
        <button type="submit" class="mt-2 px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600">Post comment</button>
        </div>
        </form>
    </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import {useUserStore} from '../stores/UserStore'
import AuthorName from './AuthorName.vue';
export default {
    name: 'CommentSection',
    components:{AuthorName},
    props: {
        id: Number,
        comments: Array,
    },
    computed:{
        ...mapState(useUserStore,{
            user:'user'
        })
    },
  data() {
    return {
      commentsArray: [],
      userComment: "",
      replyForm:{
        parentId: null,
        content: "", 
      },
      editCommentForm: {
        originalCommentId: null,
        newContent: "", 
      },
      editReplyForm: {
        originalReplyId: null,
        newContent: "", 
      },
       
    };
  },
  created(){
    this.commentsArray = this.comments
  },
  methods: {
    
    ...mapActions(useUserStore,{
        postComment: 'postComment',
        deleteComment: 'deleteComment',
        deleteReply: 'deleteReply',
        addReply: 'addReply',
        editComment: 'editComment',
        editReply: 'editReply',
    }),
    addComment() {
      const payload = {recipeId: this.id,content: this.userComment}
        this.postComment(payload)
        this.$router.go(0);
    },
    editUserComment(){
        const payload = {commentId: this.editCommentForm.originalCommentId,content: this.editCommentForm.newContent}
        this.editComment(payload)
        this.$router.go(0);
    },
    editUserReply(){
        const payload = {replyId: this.editReplyForm.originalReplyId,content: this.editReplyForm.newContent}
        this.editReply(payload)
        this.$router.go(0);
    },
    deleteUserComment(id){
        this.deleteComment(id)
        this.$router.go(0);
    },
    deleteUserReply(id){
        this.deleteReply(id)
       this.$router.go(0)
    },
    showReplyForm(commentId) {
      this.replyForm.parentId = commentId;
    },
    showEditReply(commentId){
        this.editReplyForm.originalReplyId = commentId
    },
    showEditComment(commentId){
        this.editCommentForm.originalCommentId = commentId
    },
    addCommentReply() {
        const payload = {commentId: this.replyForm.parentId,content: this.replyForm.content }
        this.addReply(payload)
        this.$router.go(0);
    },
  },
};
</script>         
  