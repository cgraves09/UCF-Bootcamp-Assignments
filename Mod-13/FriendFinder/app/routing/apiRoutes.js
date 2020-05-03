let friendData = require('../data/friends');

module.exports = function(app){
    app.get('/api/friends', function(req,res){
        res.json(friendData);
    });

    app.post('/api/friends', function(req,res){
        
        let newFriendData = req.body;
        console.log(newFriendData.photo)
       
        for (let i = 0; i < newFriendData.scores.length; i++){
            newFriendData.scores[i] = parseInt(newFriendData.scores[i]);
            
        };
        
        let maxDiff = 40;
        let bestFriendIndex = 0
        
        for (let i = 0; i < friendData.length; i++){
            let totalDiff = 0
            for (let j = 0; j < friendData[i].scores.length; j++){
                let diff = Math.abs(newFriendData.scores[j] - friendData[i].scores[j])
                totalDiff += diff; 
                console.log(totalDiff)           
            }
            if (totalDiff < maxDiff){
                bestFriendIndex = i;
                maxDiff = totalDiff;
            }        
        }
    
        friendData.push(newFriendData);

        res.json(friendData[bestFriendIndex])
   
    });
};