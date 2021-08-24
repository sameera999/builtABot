// export default {
//   bind: (element, binding) => {
//     const el = element;
//     Object.keys(binding.value).forEach((position) => {
//       el.style[position] = binding.value[position];
//     });

//     el.style.position = 'absolute';
//   },

// };

// most common way to apply both 'bind' and 'update'
// lifecyclehooks
export default function (element, binding) {
  const el = element;
  Object.keys(binding.value).forEach((position) => {
    el.style[position] = binding.value[position];
  });

  el.style.position = 'absolute';
}
