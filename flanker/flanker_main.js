// Use JSDELIVR to get the files from a GitHub repository
// https://cdn.jsdelivr.net/gh/<github-username>/<repository-name>/
var repo_site = "https://cdn.jsdelivr.net/gh/dvitaa/jsPsych-in-QualtricsX1/flanker/";

/* experiment parameters */
var reps_per_trial_type_practice = 2;
var reps_per_trial_type = 24;

/*set up welcome block*/
var welcome = {
    type: "html-keyboard-response",
    stimulus: "Press any key to continue."
};

/*set up practice instructions block*/
var instructions_practice = {
    type: "html-keyboard-response",
    stimulus: "<p>In this task, you will see five arrows on the screen, like the example below.</p>" +
        "<img src='" + repo_site + "img/inc1.png'></img>" +
        "<p>Press the left arrow key if the middle arrow is pointing left. (<)</p>" +
        "<p>Press the right arrow key if the middle arrow is pointing right. (>)</p>" +
        "<p>You will first complete a practice round. </p>" +
        "<p>Press any key to begin.</p>",
    post_trial_gap: 1000
};

/*defining stimuli*/
var test_stimuli = [{
        stimulus: repo_site + "img/con1.png",
        data: {
            stim_type: 'congruent',
            direction: 'left'
        }
    },
    {
        stimulus: repo_site + "img/con2.png",
        data: {
            stim_type: 'congruent',
            direction: 'right'
        }
    },
    {
        stimulus: repo_site + "img/inc1.png",
        data: {
            stim_type: 'incongruent',
            direction: 'right'
        }
    },
    {
        stimulus: repo_site + "img/inc2.png",
        data: {
            stim_type: 'incongruent',
            direction: 'left'
        }
    }
];


/*defining practice trial*/

var practice = {
    timeline: [{
        type: 'image-keyboard-response',
        choices: [37, 39],
        trial_duration: 1500,
        stimulus: jsPsych.timelineVariable('stimulus'),
        data: jsPsych.timelineVariable('data'),
        on_finish: function (data) {
            var correct = false;
            if (data.direction == 'left' && data.key_press == 37 && data.rt > -1) {
                correct = true;
            } else if (data.direction == 'right' && data.key_press == 39 && data.rt > -1) {
                correct = true;
            }
            data.correct = correct;
            data.practice = 1;
        },
        post_trial_gap: function () {
            return Math.floor(Math.random() * 1500) + 500;
        }
    }],
    timeline_variables: test_stimuli,
    sample: {
        type: 'fixed-repetitions',
        size: reps_per_trial_type_practice
    }
};

/*task instructions*/
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p> The task will now begin. Press any key to start. </p>",
    post_trial_gap: 1000
};


/* defining test timeline */
var test = {
    timeline: [{
        type: 'image-keyboard-response',
        choices: [37, 39],
        trial_duration: 1500,
        stimulus: jsPsych.timelineVariable('stimulus'),
        data: jsPsych.timelineVariable('data'),
        on_finish: function (data) {
            var correct = false;
            if (data.direction == 'left' && data.key_press == 37 && data.rt > -1) {
                correct = true;
            } else if (data.direction == 'right' && data.key_press == 39 && data.rt > -1) {
                correct = true;
            }
            data.correct = correct;
            data.practice = 0;
        },
        post_trial_gap: function () {
            return Math.floor(Math.random() * 1500) + 500;
        }
    }],
    timeline_variables: test_stimuli,
    sample: {
        type: 'fixed-repetitions',
        size: reps_per_trial_type
    }
};

/*defining debriefing block*/
var debrief = {
    type: "html-keyboard-response",
    stimulus: function () {
        // var total_trials = jsPsych.data.get().filter({
        //     trial_type: 'image-keyboard-response'
        // }).count();
        // var accuracy_flanker = Math.round(jsPsych.data.get().filter({
        //     correct: true,
        //     practice: 0
        // }).count() / total_trials * 100);
        // var congruent_rt = Math.round(jsPsych.data.get().filter({
        //     correct: true,
        //     stim_type: 'congruent',
        //     practice: 0
        // }).select('rt').mean());
        // var incongruent_rt = Math.round(jsPsych.data.get().filter({
        //     correct: true,
        //     stim_type: 'incongruent',
        //     practice:0
        // }).select('rt').mean());
        return  "Press any key to continue."
        // "<p>You responded correctly on <strong>" + accuracy_flanker + "%</strong> of the trials.</p> " +
        //     "<p>Your average response time for congruent trials was <strong>" + congruent_rt + "ms</strong>.</p>" +
        //     "<p>Your average response time for incongruent trials was <strong>" + incongruent_rt + "ms</strong>.</p>" +
        //     "<p>Press any key to complete the experiment. Thank you!</p>"
    }
};
/* remove  debrief for ppts*/

/*set up  experiment structure*/
var timeline = [];
timeline.push(welcome);
timeline.push(instructions_practice);
timeline.push(practice);
timeline.push(instructions);
timeline.push(test);
timeline.push(debrief);




