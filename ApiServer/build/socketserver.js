"use strict";
exports.__esModule = true;
var io = require('socket.io');
var pick = require('lodash').pick;
var nameData = {
    count: 0,
    getNameAndCount: function () {
        if (this.count >= this.list.length) {
            this.count = 1;
            return { name: this.list[0], count: 0, classes: this.list[0].classIDList };
        }
        var str = this.list[this.count].name;
        var classes = this.list[this.count].classIDList;
        var currentCount = this.count;
        this.count++;
        return { name: str, count: currentCount, classes: classes };
    },
    list: [
        { name: 'Bilbo Baggins', classIDList: [0, 1, 2] },
        { name: 'Frodo Baggins', classIDList: [0, 1, 2] },
        { name: 'Samwise Gamgee', classIDList: [0, 1, 2] },
        { name: 'Merry Brandybuck', classIDList: [0, 1, 2] },
        { name: 'Pippin Took', classIDList: [0, 1, 2] },
        { name: 'Tom Bombadil', classIDList: [0, 1, 2] },
        { name: 'Xuan Fronk', classIDList: [0, 1, 2] },
        { name: 'Victoria Mebane', classIDList: [0, 1, 2] },
        { name: 'Tiffaney Wile', classIDList: [0, 1, 2] },
        { name: 'Troy Gervais', classIDList: [0, 1, 2] },
        { name: 'Valda Carriere', classIDList: [0, 1, 2] },
        { name: 'Deborah Loder', classIDList: [0, 1, 2] },
        { name: 'Karl Giddens', classIDList: [0, 1, 2] },
        { name: 'Marguerite Brookes', classIDList: [0, 1, 2] },
        { name: 'Cameron Rushford', classIDList: [0, 1, 2] },
        { name: 'Charlesetta Lundstrom', classIDList: [0, 1, 2] },
        { name: 'Klara Gallman', classIDList: [0, 1, 2] },
        { name: 'Angele Harry', classIDList: [0, 1, 2] },
        { name: 'Norah Pears', classIDList: [0, 1, 2] },
        { name: 'Debora Waymire', classIDList: [0, 1, 2] },
        { name: 'Norine Messerly', classIDList: [0, 1, 2] },
        { name: 'Mark Weingart', classIDList: [0, 1, 2] },
        { name: 'Stephanie Mcginnis', classIDList: [0, 1, 2] },
        { name: 'Roscoe Birdsell', classIDList: [0, 1, 2] },
        { name: 'Santa Staudt', classIDList: [0, 1, 2] },
        { name: 'Jonathon Abram', classIDList: [0, 1, 2] },
        { name: 'Tomas Lagarde', classIDList: [0, 1, 2] },
        { name: 'Renda Strauch', classIDList: [0, 1, 2] },
        { name: 'Carolynn Mullikin', classIDList: [0, 1, 2] },
        { name: 'Elias Scogin', classIDList: [0, 1, 2] },
        { name: 'Edward Elric', classIDList: [0, 1, 2] },
        { name: 'Ty Gaeth', classIDList: [0, 1, 2] },
        { name: 'Imelda Melnick', classIDList: [0, 1, 2] },
        { name: 'Jackie Kuiper', classIDList: [0, 1, 2] },
        { name: 'Stacey Mone', classIDList: [0, 1, 2] },
        { name: 'Elfreda Antonelli', classIDList: [0, 1, 2] },
        { name: 'Elizabeth Soriano', classIDList: [0, 1, 2] },
        { name: 'Kristyn Hultman', classIDList: [0, 1, 2] },
        { name: 'Miles Andre', classIDList: [0, 1, 2] },
        { name: 'Tammera Phaneuf', classIDList: [0, 1, 2] },
        { name: 'Roxane Wirtz', classIDList: [0, 1, 2] },
        { name: 'Vergie Level', classIDList: [0, 1, 2] },
        { name: 'Verna Einhorn', classIDList: [0, 1, 2] },
        { name: 'Nereida Romanowski', classIDList: [0, 1, 2] },
        { name: 'Dorathy Cafferty', classIDList: [0, 1, 2] },
        { name: 'Sean Fadden', classIDList: [0, 1, 2] },
        { name: 'Garrett Bossard', classIDList: [0, 1, 2] },
        { name: 'Alla Montijo', classIDList: [0, 1, 2] },
        { name: 'Randall Reddington', classIDList: [0, 1, 2] },
        { name: 'Arlinda Rent', classIDList: [0, 1, 2] },
    ]
};
function default_1(server) {
    var socketServer = io(server);
    var connections = [];
    var classQueues = {
        0: {
            queue: [],
            TAs: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
            TAActivityLog: [],
            isActive: false,
            id: 0,
            name: 'CIS 110',
            broadcast: '',
            locations: []
        },
        1: {
            queue: [],
            TAs: [],
            TAActivityLog: [],
            isActive: true,
            id: 1,
            name: 'CIS 120',
            broadcast: '',
            locations: ['Towne 100']
        },
        2: {
            queue: [],
            TAs: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30].map(function (x) { return x + 1; }),
            TAActivityLog: [],
            isActive: false,
            id: 2,
            name: 'CIS 160',
            broadcast: '',
            locations: []
        }
    };
    socketServer.on('connection', function (socket) {
        connections.push(socket);
        console.log('A user connected!');
        console.log("new length: " + connections.length);
        var _a = nameData.getNameAndCount(), currentName = _a.name, count = _a.count, classes = _a.classes;
        if (classes && classes.length) {
            for (var i = 0; i < classes.length; i++) {
                socket.join("" + classes[i]);
            }
        }
        socket.emit('ALL_CLASS_DATA', pick(classQueues, classes));
        socket.emit('USER_INFO_UPDATED', {
            id: count,
            firstName: currentName.split(' ')[0],
            lastName: currentName.split(' ')[1]
        });
        socket.on('disconnect', function () {
            var index = connections.indexOf(socket);
            connections.splice(index, 1);
            console.log('a user disconnected!');
            console.log("new length: " + connections.length);
        });
        socket.on('UPDATE_CLASS', function (data) {
            console.log('update class event logged:', data);
            classQueues[data.id] = data;
            socketServer.emit('CLASS_UPDATED', classQueues[data.id]);
        });
        socket.on('JOIN_CLASS_QUEUE', function (_a) {
            var question = _a.question, location = _a.location, userInfo = _a.userInfo, classId = _a.classId;
            for (var i = 0; i < classQueues[classId].queue.length; i++) {
                if (classQueues[classId].queue[i].userInfo.id === userInfo.id)
                    return;
            }
            classQueues[classId].queue.push({ question: question, location: location, userInfo: userInfo });
            socketServer.to("" + classId).emit('CLASS_QUEUE_JOINED', classQueues[classId]);
        });
        socket.on('ACTIVATE_CLASS', function (_a) {
            var classId = _a.classId, locationText = _a.locationText, endTime = _a.endTime;
            classQueues[classId].isActive = true;
            classQueues[classId].locations.push(locationText);
            socketServer.to("" + classId).emit('CLASS_ACTIVATED', classQueues[classId]);
        });
        socket.on('DEACTIVATE_CLASS', function (classId) {
            classQueues[classId].isActive = false;
            classQueues[classId].queue = [];
            classQueues[classId].locations = [];
            classQueues[classId].broadcast = '';
            socketServer.to("" + classId).emit('CLASS_DEACTIVATED', classQueues[classId]);
        });
        socket.on('UPDATE_BROADCAST', function (_a) {
            var classId = _a.classId, broadcast = _a.broadcast;
            classQueues[classId].broadcast = broadcast;
            socketServer.to("" + classId).emit('BROADCAST_UPDATED', classQueues[classId]);
        });
        socket.on('REMOVE_FROM_QUEUE', function (_a) {
            var classId = _a.classId, TAInfo = _a.TAInfo;
            if (!classQueues[classId].queue.length)
                return;
            socketServer.to("" + classId).emit('QUEUE_REMOVED_FROM', classQueues[classId]);
        });
        socket.on('UPDATE_TA_ACTIVITY_LOG', function (_a) {
            var classId = _a.classId, TAInfo = _a.TAInfo;
            socketServer.to("" + classId);
        });
    });
}
exports["default"] = default_1;
