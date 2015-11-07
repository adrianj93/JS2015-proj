(function (global){

var InputCtrl;
UAM.InputCtrl = function(inputView, store){
    
	inputView.on("btnClicked",function(task_text){
		store.add(task_text);
	})
}

}(window));