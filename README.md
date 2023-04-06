# hw2-handling-input-events

## Deployment
[Netlify Website Link](aesthetic-monstera-91978f.netlify.app)

## Process Control Strategy
The current process control strategy relies heavily on the use of global flags such as "isDragging" and "isDoubleClicking" to determine the current state of the program. These flags are used to halt the current activity by setting the current activity flag to false in case of any escaping condition. Moreover, this approach may accurately represent the state of the program when two different activities are likely to occur simultaneously.

## Bonus
A bonus feature of the program is its ability to perform complete vertical resizing. The program achieves this by checking the user's finger position to determine whether they want to resize the width or the height of the object.