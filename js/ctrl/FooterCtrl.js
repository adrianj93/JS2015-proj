(function (global){

var FooterCtrl;
UAM.FooterCtrl = function(footerView, store){	
    
    // Event dodanie nowego taska
	store.on('ev_newtask', function(task_text, status, len){
		footerView.numberTasks(len);
        
	})
    
    // event zmiana statusu
	store.on('ev_changed', function(task_text, status, active){
		footerView.numerActiveupd(active);
	})
    

}

}(window));
