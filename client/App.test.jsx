// import { describe, it, expect, test } from "vitest";
// import { vi, beforeEach, afterEach } from 'vitest';

// // Mock de createRoot pour capturer les appels à cette fonction
// vi.mock('react-dom/client', () => ({
//   createRoot: vi.fn(() => ({
//     render: vi.fn(),
//   })),
// }));

// describe('DOM rendering', () => {
//   beforeEach(() => {
//     document.body.innerHTML = '';
//   });

//   afterEach(() => {
//     vi.clearAllMocks();
//   });

//   it('renders the application if #root is present', () => {
//     const rootDiv = document.createElement('div');
//     rootDiv.id = 'root';
//     document.body.appendChild(rootDiv);

//     // Mock getElementById pour qu'il retourne rootDiv
//     vi.spyOn(document, 'getElementById').mockReturnValue(rootDiv);
//     expect(document.body.innerHTML).toMatch(/RED TETRIS/i); 

//     // Nettoyage
//     document.body.removeChild(rootDiv);
//   });


// //   it('renders without crashing', () => {
// //     const rootDiv = document.createElement('div');
// //     rootDiv.id = 'root';
// //     document.body.appendChild(rootDiv);

// //     render(
// //         <App />,
// //       { container: rootDiv } 
// //     );

// //     expect(document.body.innerHTML).toMatch(/RED TETRIS/i); 
// //   });
// })
