
const express = require("express");
const phelper = require("../helpers/projectModel");
const ahelper = require("../helpers/actionModel");
const validateProjectID = require("../middle/validateProjectID");
const validateProject = require("../middle/validateProject");
const validateAction = require("../middle/validateAction");

const router = express.Router();

router.get("/", (_, res) => {
    helper.get()
        .then(res2 => res.status(200).json(res2))
        .catch(() => res.status(500).json({error: "Error retrieving projects"}));
})

router.get("/:id", validateProjectID, (req, res) => {
    res.status(200).json(req.project);
})

router.get("/:id/actions", validateProjectID, (req, res) => {
    res.status(200).json(req.project.actions);
})

router.post("/", validateProject, (req, res) => {
    helper.insert(req.body)
        .then(res2 => res.status(201).json(res2))
        .catch(() => res.status(500).json({error: "unable to post project"}));
})

router.post("/:id/actions", validateProjectID, validateAction, (req, res) => {
    actionHelper.insert({ ...req.body, project_id: req.params.id })
        .then(res2 => res.status(201).json(res2))
        .catch(() => res.status(500).json({error: "unable to post action to project"}));
})

router.put("/:id", validateProjectID, validateProject, (req, res) => {
    helper.update(req.project.id, {...req.body})
        .then(res2 => {
            if (res2) {
                res.status(200).json(res2);
            } else {
                res.status(500).json({error: "unable to update project"});
            }
        })
        .catch(() => res.status(500).json({error: "unable to update project"}))
})

router.delete("/:id", validateProjectID, (req, res) => {
    helper.remove(req.project.id)
        .then(res2 => {
            if (res2) {
                res.sendStatus(204);
            } else {
                res.status(500).json({error: "unable to delete project"});
            }
        })
        .catch(() => res.status(500).json({error: "unable to delete project"}))
})

module.exports = router;
// const express = require('express');
// const pHelper = require('../helpers/projectModel');
// // const aHelper = require('../helpers/actionModel')

// const router = express.Router();

// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// // GETS PROJECTS
// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// router.get('/', (_, res) => {
//     pHelper.get()
//         .then(res2 => res.status(200).json(res2))
//         .catch(() => res.status(500).json({error: "Error retrieving projects"}));
// });

// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// // GETS PROJECTS BY ID AND ITS ACTIONS
// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// router.get('/:id', (req, res) => {
//     pHelper.get(req.params.id)
//     .then ((project) => {
//         if(!project){
//             res.status(404).json({
//                 Message: "Cannot find project with specified ID. Please try again"
//     });
//         } else {
//         res.status(200).json(project);
//         }
//     })
//     .catch((error) => {
//         console.log(error)
//         res.status(500).json({
//             Error: "there was an error retrieving projects"
//         });
//     });
// });

// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// // POSTS NEW PROJECT
// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// router.post('/', (req, res) => {
//     pHelper.insert(req.body)
//     .then((project) => {
//         if(!req.body){
//             res.status(400).json({Message: "Please enter correct values for the project"});
//         } else {
//         res.status(201).json({project: "The project was created successfully"});
//         }
//     })
//     .catch((error) => {
//         console.log(error);
//         res.status(500).json({error: "error posting project"});   
//      });
// });

// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// //  UPDATES THE PROJECT BY ID
// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// router.put('/:id', (req, res) => {
//     pHelper.update(req.params.id, {...req.body})
//         .then((project) => {
//             if(!project){
//                 res.status(404).json({
//                     Message: "Cannot find project with specified ID. Please try again"
//                     });
//             } else {
//                 res.status(200).json({
//                     Message: "Project was updated successfully"
//                 });
//             }
//         })
    
//         .catch((error) => {
//             res.status(500).json
//             ({
//                 Error: "There was a problem updating project"
//             });
//         });
// });

// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// // DELETES PROJECT WITH SPECIFIED ID
// //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// router.delete('/:id', (req, res) => {
//     pHelper.remove(req.params.id)
//         .then(project => {
//             if(!project){
//                 res.status(404).json({
//                     Message: "Cannot find project with specified ID. Please try again"
//         });
//             } else {
//             res.status(200).json({
//                 Message: "Project has been deleted successfully"
//             });
//           }
//        })
//         .catch((error) => {
//             res.status(500).json({
//                 Error: "There was a problem deleting the project"
//             });
//         });
//     });   

// module.exports = router;