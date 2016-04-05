var stampit     = require('stampit'),
    RangeList   = require('js-range-list'),
    Q           = require('q');

module.exports = stampit()
    .init(function () {

        var localRegisters  = [],
            timeoutId       = null,
            running         = false;

        var init = function () {

            this.log.info('Initiating Loop.');

            if (!this.loopDuration) this.loopDuration = 0;
            
            requests = RangeList({ max : this.max });

            this.on('connect', startLoop);
            this.on('end', stopLoop);
        
        }.bind(this);

        var startLoop = function () {
       
            this.log.debug('Starting loop.');

            var q           = [], 
                currentQ    = null, 
                startTime   = (new Date()).getTime(),
                diffTime    = 0;

            if (!running) {
                return;
            }

            requests.getList().forEach(function (p, i) {
         
                this.log.debug('Preparing request for registers', p.start,'to',p.end);

                currentQ = this.readHoldingRegisters(p.start, p.end - p.start);
                currentQ.then(updateLocalRegisters(p.start));

                q.push(currentQ);
            
            }.bind(this));

            Q.when.apply(null, q).then(function () {

                this.log.debug('All requests where successfull.');

                // calculate request duration         

                diffTime = (new Date()).getTime() - startTime;

                this.log.debug('Request time', diffTime);

                timeoutId = setTimeout(startLoop, Math.max(0, this.loopDuration - diffTime));
          
                this.emit('loopUpdate', localRegisters, diffTime); 

            }.bind(this)).fail(function () {
            
                this.log.error('Some requests failed.', arguments);

                setTimeout(startLoop, this.loopDuration);
            
            }.bind(this));
        
        }.bind(this);

        var stopLoop = function () {

            clearTimeout(timeoutId);
            running = false; 
        
        }.bind(this);
   
        var updateLocalRegisters = function (start) {
            
            return function (resp) {
       
                this.log.debug('Handling request.', start);

                resp.register.forEach(function (r, i) {

                    localRegisters[i + start] = r;                
                
                });
        
            }.bind(this);

        }.bind(this);

        this.startLoop = function () {
            
            running = true;
            startLoop(); 
        
        };

        this.stopLoop = function () {
        
            stopLoop();
        
        };

        this.loopHoldingRegisters = function (start, count) {
       
            this.log.info('Looping for new Register', start, count);

            requests.merge(start, start + count);

            this.log.debug(requests.getList());

            return this;
        
        }.bind(this);

        init();
    
    });
