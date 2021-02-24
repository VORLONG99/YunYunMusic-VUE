var app =new Vue({
    el: "#main",
    data: {
        query: "",
        name:'',
        musicList: [],
        musicUrl:'',
        musicCover:'',
        comment:[],
        isplaying:false,
        playMv:false,
        mv:''
    },
    methods: {
        searchMusic:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.query)
            .then(function(respones){
                // console.log(respones.data.result.songs)
                that.musicList = respones.data.result.songs;              
            },function(err){
                console.log(err)
            })

        },
        playMusic:function(musicId){
            var that = this;
            // https://autumnfish.cn/song/url?id=536570450
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
            .then(function(respones){
                that.musicUrl = respones.data.data[0].url
                
                
            },function(err){
                console.log(err)
            })
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
            .then(function(respones){
                that.musicCover = respones.data.songs[0].al.picUrl
                that.name = respones.data.songs[0].name
            },function(err){
                console.log(err)
            })
            // https://autumnfish.cn/comment/hot?type=0&id=536570450
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
            .then(function(respones){
                that.comment = respones.data.hotComments
                
            },function(err){
                console.log(err)
            })

        },
        play:function(){
            this.isplaying = true;
        },
        pause:function(){
            this.isplaying = false;
        },
        showMv:function(mvid){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
            .then(function(respones){
                that.mv = respones.data.data.url;
                that.playMv = true;
            },function(err){
                console.log(err)
            })
        },
        delmv:function(){
            this.playMv = false;
            this.mv = '';
        },

    }
})