(this["webpackJsonpproductivity-app"] =
  this["webpackJsonpproductivity-app"] || []).push([
  [0],
  {
    104: function (e, a, t) {
      e.exports = t(162);
    },
    162: function (e, a, t) {
      "use strict";
      t.r(a);
      var n = t(0),
        l = t.n(n),
        r = t(94),
        s = t.n(r),
        o = t(13),
        c = t(8),
        i = t(174),
        m = t(96),
        u = t(176),
        d = t(52),
        p = t.n(d);
      t(93);
      var E = function (e) {
          let { isLoggedIn: a, onLogout: t } = e;
          const [r, s] = Object(n.useState)(!1),
            d = Object(c.o)();
          Object(n.useEffect)(() => {
            s(!1);
          }, [d.pathname]);
          const E = () => {
            s(!1);
          };
          return l.a.createElement(
            l.a.Fragment,
            null,
            l.a.createElement(
              "div",
              null,
              l.a.createElement(
                i.a,
                {
                  expand: "md",
                  fixed: "top",
                  expanded: r,
                  onToggle: s,
                  className: p.a.NavBar,
                },
                l.a.createElement(
                  m.a,
                  null,
                  l.a.createElement(
                    i.a.Brand,
                    { className: "me-auto" },
                    l.a.createElement("img", {
                      src: "/logo192.png",
                      alt: "logo",
                      height: "45",
                      className: "me-2",
                    }),
                    l.a.createElement(
                      "span",
                      { className: "fw-bold" },
                      "Productivity"
                    )
                  ),
                  l.a.createElement(i.a.Toggle, {
                    "aria-controls": "navbarScroll",
                  }),
                  l.a.createElement(
                    i.a.Collapse,
                    { id: "navbarScroll" },
                    l.a.createElement(
                      u.a,
                      { className: "ms-auto my-2 my-lg-0", navbarScroll: !0 },
                      !a &&
                        l.a.createElement(
                          o.c,
                          {
                            to: "/",
                            className: p.a.NavLink + " fw-bold",
                            onClick: E,
                          },
                          l.a.createElement("i", {
                            className: "fa-solid fa-house",
                          }),
                          " Home Page"
                        ),
                      a &&
                        l.a.createElement(
                          l.a.Fragment,
                          null,
                          l.a.createElement(
                            o.c,
                            {
                              to: "/CreateTask",
                              className: p.a.NavLink + " fw-bold",
                              onClick: E,
                            },
                            l.a.createElement("i", {
                              className: "fa-solid fa-square-plus",
                            }),
                            " Create Task"
                          ),
                          l.a.createElement(
                            o.c,
                            {
                              to: "/tasklist",
                              className: p.a.NavLink + " fw-bold",
                              onClick: E,
                            },
                            l.a.createElement("i", {
                              className: "fa-solid fa-list-check",
                            }),
                            " Task List"
                          ),
                          l.a.createElement(
                            u.a.Link,
                            { onClick: t, className: p.a.NavLink + " fw-bold" },
                            l.a.createElement("i", {
                              className: "fa-solid fa-sign-out-alt",
                            }),
                            " Logout"
                          )
                        )
                    )
                  )
                )
              )
            )
          );
        },
        g = t(97),
        v = t.n(g),
        y = t(172);
      const h = y.a.create({
        baseURL: "https://project-5-productivity-backend.onrender.com/",
        timeout: 1e4,
        headers: { "Content-Type": "application/json" },
      });
      h.interceptors.request.use(
        (e) => {
          const a = localStorage.getItem("access_token");
          return a && (e.headers.Authorization = "Bearer " + a), e;
        },
        (e) => Promise.reject(e)
      ),
        h.interceptors.response.use(
          (e) => e,
          async (e) => {
            var a;
            const t = e.config;
            if (
              401 ===
                (null === (a = e.response) || void 0 === a
                  ? void 0
                  : a.status) &&
              !t._retry
            ) {
              t._retry = !0;
              try {
                const e = localStorage.getItem("refresh_token");
                if (e) {
                  const a = (
                    await y.a.post(h.defaults.baseURL + "/api/token/refresh/", {
                      refresh: e,
                    })
                  ).data.access;
                  return (
                    localStorage.setItem("access_token", a),
                    (t.headers.Authorization = "Bearer " + a),
                    h(t)
                  );
                }
                localStorage.removeItem("access_token"),
                  localStorage.removeItem("refresh_token"),
                  (window.location.href = "/login");
              } catch (n) {
                localStorage.removeItem("access_token"),
                  localStorage.removeItem("refresh_token"),
                  (window.location.href = "/login");
              }
            }
            return Promise.reject(e);
          }
        );
      var b = h,
        f = t(168),
        k = t(98),
        S = t(175),
        N = t(178),
        C = t(173),
        w = t(169),
        j = t(22),
        O = t.n(j),
        _ = t(23);
      var x = (e) => {
        let { onLogin: a } = e;
        const t = Object(c.q)(),
          [r, s] = Object(n.useState)(""),
          [i, u] = Object(n.useState)(""),
          [d, p] = Object(n.useState)("");
        return l.a.createElement(
          m.a,
          {
            className: Object(_.a)(
              O.a.container,
              "d-flex",
              "flex-column",
              "justify-content-center",
              "align-items-center"
            ),
          },
          l.a.createElement(
            f.a,
            { className: "w-100" },
            l.a.createElement(
              k.a,
              { xs: 12, sm: 10, md: 8, lg: 5, className: "mx-auto " },
              l.a.createElement(
                S.a,
                { className: "shadow" },
                l.a.createElement(
                  S.a.Body,
                  null,
                  l.a.createElement(
                    S.a.Title,
                    { className: "text-center" },
                    "Login"
                  ),
                  d && l.a.createElement(N.a, { variant: "danger" }, d),
                  l.a.createElement(
                    C.a,
                    {
                      onSubmit: async (e) => {
                        e.preventDefault();
                        try {
                          const e = await b.post(
                            "/api/login/",
                            { email: r, password: i },
                            { timeout: 5e3 }
                          );
                          localStorage.setItem("access_token", e.data.access),
                            localStorage.setItem(
                              "refresh_token",
                              e.data.refresh
                            ),
                            a(),
                            t("/");
                        } catch (s) {
                          var n, l;
                          p(
                            (null === (n = s.response) ||
                            void 0 === n ||
                            null === (l = n.data) ||
                            void 0 === l
                              ? void 0
                              : l.message) || "Invalid email or password."
                          );
                        }
                      },
                    },
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "formEmail" },
                      l.a.createElement(C.a.Label, null, "Email"),
                      l.a.createElement(C.a.Control, {
                        type: "email",
                        value: r,
                        onChange: (e) => s(e.target.value),
                        required: !0,
                      })
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "formPassword" },
                      l.a.createElement(C.a.Label, null, "Password"),
                      l.a.createElement(C.a.Control, {
                        type: "password",
                        value: i,
                        onChange: (e) => u(e.target.value),
                        required: !0,
                      })
                    ),
                    l.a.createElement(
                      w.a,
                      {
                        variant: "primary",
                        type: "submit",
                        className: "w-100 mt-3",
                      },
                      "Login"
                    )
                  ),
                  l.a.createElement(
                    "div",
                    { className: "text-center mt-3" },
                    "Don't have an account? ",
                    l.a.createElement(o.b, { to: "/register" }, "Register")
                  )
                )
              )
            )
          )
        );
      };
      var L = () => {
          const e = Object(c.q)(),
            [a, t] = Object(n.useState)(""),
            [r, s] = Object(n.useState)(""),
            [i, u] = Object(n.useState)(""),
            [d, p] = Object(n.useState)(""),
            [E, g] = Object(n.useState)("");
          return l.a.createElement(
            m.a,
            {
              className: Object(_.a)(
                O.a.container,
                "d-flex",
                "flex-column",
                "justify-content-center",
                "align-items-center"
              ),
            },
            l.a.createElement(
              f.a,
              { className: "w-100" },
              l.a.createElement(
                k.a,
                { xs: 12, sm: 10, md: 8, lg: 5, className: "mx-auto " },
                l.a.createElement(
                  S.a,
                  { className: "shadow" },
                  l.a.createElement(
                    S.a.Body,
                    null,
                    l.a.createElement(
                      S.a.Title,
                      { className: "text-center" },
                      "Register"
                    ),
                    E && l.a.createElement(N.a, { variant: "danger" }, E),
                    l.a.createElement(
                      C.a,
                      {
                        onSubmit: async (t) => {
                          if ((t.preventDefault(), i.length < 8))
                            g("Password must be at least 8 characters long.");
                          else if (i === d)
                            try {
                              await b.post(
                                "/api/register/",
                                {
                                  name: a,
                                  email: r,
                                  password: i,
                                  confirm_password: d,
                                },
                                { timeout: 5e3 }
                              );
                              e("/login");
                            } catch (s) {
                              var n, l;
                              g(
                                (null === (n = s.response) ||
                                void 0 === n ||
                                null === (l = n.data) ||
                                void 0 === l
                                  ? void 0
                                  : l.message) ||
                                  "An error occurred during registration."
                              );
                            }
                          else g("Passwords do not match.");
                        },
                      },
                      l.a.createElement(
                        C.a.Group,
                        { controlId: "formName" },
                        l.a.createElement(C.a.Label, null, "Name"),
                        l.a.createElement(C.a.Control, {
                          type: "text",
                          value: a,
                          onChange: (e) => t(e.target.value),
                          required: !0,
                        })
                      ),
                      l.a.createElement(
                        C.a.Group,
                        { controlId: "formEmail" },
                        l.a.createElement(C.a.Label, null, "Email"),
                        l.a.createElement(C.a.Control, {
                          type: "email",
                          value: r,
                          onChange: (e) => s(e.target.value),
                          required: !0,
                        })
                      ),
                      l.a.createElement(
                        C.a.Group,
                        { controlId: "formPassword" },
                        l.a.createElement(C.a.Label, null, "Password"),
                        l.a.createElement(C.a.Control, {
                          type: "password",
                          value: i,
                          onChange: (e) => u(e.target.value),
                          required: !0,
                        })
                      ),
                      l.a.createElement(
                        C.a.Group,
                        { controlId: "formConfirmPassword" },
                        l.a.createElement(C.a.Label, null, "Confirm Password"),
                        l.a.createElement(C.a.Control, {
                          type: "password",
                          value: d,
                          onChange: (e) => p(e.target.value),
                          required: !0,
                        })
                      ),
                      l.a.createElement(
                        w.a,
                        {
                          variant: "primary",
                          type: "submit",
                          className: "w-100 mt-3",
                        },
                        "Register"
                      )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "text-center mt-3" },
                      "Already have an account? ",
                      l.a.createElement(o.b, { to: "/login" }, "Login")
                    )
                  )
                )
              )
            )
          );
        },
        D = t(73),
        I = t.n(D),
        T = (t(83), t(170));
      var A = (e) => {
          let { onSubmit: a, onCancel: t } = e;
          const [r, s] = Object(n.useState)(""),
            [o, c] = Object(n.useState)(""),
            [i, u] = Object(n.useState)(new Date()),
            [d, p] = Object(n.useState)("medium"),
            [E, g] = Object(n.useState)("development"),
            [v, y] = Object(n.useState)("pending"),
            [h, f] = Object(n.useState)([]),
            [k, j] = Object(n.useState)([]),
            [x, L] = Object(n.useState)([]),
            [D, A] = Object(n.useState)(!0),
            [P, F] = Object(n.useState)(""),
            [G, z] = Object(n.useState)(""),
            [B, U] = Object(n.useState)(!1);
          Object(n.useEffect)(() => {
            (async () => {
              try {
                const e = localStorage.getItem("access_token"),
                  a = await b.get("/api/users/", {
                    headers: { Authorization: "Bearer " + e },
                  });
                L(a.data);
              } catch (e) {
                F("Failed to load users.");
              } finally {
                A(!1);
              }
            })();
          }, []);
          const q = () => {
            s(""),
              c(""),
              u(new Date()),
              p("medium"),
              g("development"),
              y("pending"),
              f([]),
              j([]),
              z(""),
              F("");
          };
          return D
            ? l.a.createElement(
                m.a,
                { className: "text-center mt-5" },
                l.a.createElement(T.a, { animation: "border" }),
                l.a.createElement("p", null, "Loading users...")
              )
            : l.a.createElement(
                m.a,
                {
                  className: Object(_.a)(
                    O.a.container,
                    "d-flex",
                    "flex-column",
                    "justify-content-center",
                    "align-items-center",
                    "mt-5"
                  ),
                },
                l.a.createElement(
                  S.a,
                  {
                    className: "p-4 shadow",
                    style: { width: "100%", maxWidth: "600px" },
                  },
                  l.a.createElement(
                    "h3",
                    { className: "text-center mb-4" },
                    "Create Task"
                  ),
                  G &&
                    l.a.createElement(
                      N.a,
                      { variant: "success", className: "mb-3" },
                      G
                    ),
                  P &&
                    l.a.createElement(
                      N.a,
                      { variant: "danger", className: "mb-3" },
                      P
                    ),
                  l.a.createElement(
                    C.a,
                    {
                      onSubmit: async (e) => {
                        e.preventDefault(), F(""), z(""), U(!0);
                        const t = {
                          title: r,
                          description: o,
                          dueDate: i,
                          priority: d,
                          category: E,
                          status: v,
                          assignedUsers: h,
                          files: k,
                        };
                        try {
                          await a(t),
                            z("Task created successfully!"),
                            setTimeout(() => {
                              q(), z("");
                            }, 3e3);
                        } catch (s) {
                          var n, l;
                          F(
                            (null === s ||
                            void 0 === s ||
                            null === (n = s.response) ||
                            void 0 === n ||
                            null === (l = n.data) ||
                            void 0 === l
                              ? void 0
                              : l.detail) ||
                              (null === s || void 0 === s
                                ? void 0
                                : s.message) ||
                              "Something went wrong while creating the task."
                          );
                        } finally {
                          U(!1);
                        }
                      },
                    },
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "taskTitle" },
                      l.a.createElement(C.a.Control, {
                        type: "text",
                        placeholder: "Task Title",
                        value: r,
                        onChange: (e) => s(e.target.value),
                        required: !0,
                      })
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "taskDescription", className: "mt-3" },
                      l.a.createElement(C.a.Control, {
                        as: "textarea",
                        placeholder: "Task Description",
                        value: o,
                        onChange: (e) => c(e.target.value),
                        rows: 3,
                        required: !0,
                      })
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "dueDate", className: "mt-3" },
                      l.a.createElement(C.a.Label, null, "Due Date"),
                      l.a.createElement(I.a, {
                        selected: i,
                        onChange: (e) => u(e),
                        className: "form-control",
                        required: !0,
                      })
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "taskPriority", className: "mt-3" },
                      l.a.createElement(C.a.Label, null, "Priority"),
                      l.a.createElement(
                        C.a.Select,
                        { value: d, onChange: (e) => p(e.target.value) },
                        l.a.createElement("option", { value: "low" }, "Low"),
                        l.a.createElement(
                          "option",
                          { value: "medium" },
                          "Medium"
                        ),
                        l.a.createElement("option", { value: "high" }, "High")
                      )
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "taskCategory", className: "mt-3" },
                      l.a.createElement(C.a.Label, null, "Category"),
                      l.a.createElement(
                        C.a.Select,
                        { value: E, onChange: (e) => g(e.target.value) },
                        l.a.createElement(
                          "option",
                          { value: "development" },
                          "Development"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "design" },
                          "Design"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "testing" },
                          "Testing"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "documentation" },
                          "Documentation"
                        ),
                        l.a.createElement("option", { value: "other" }, "Other")
                      )
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "taskStatus", className: "mt-3" },
                      l.a.createElement(C.a.Label, null, "Status"),
                      l.a.createElement(
                        C.a.Select,
                        { value: v, onChange: (e) => y(e.target.value) },
                        l.a.createElement(
                          "option",
                          { value: "pending" },
                          "To Do"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "in_progress" },
                          "In Progress"
                        ),
                        l.a.createElement("option", { value: "done" }, "Done")
                      )
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "assignedUsers", className: "mt-3" },
                      l.a.createElement(C.a.Label, null, "Assigned Users"),
                      l.a.createElement(
                        C.a.Select,
                        {
                          multiple: !0,
                          value: h,
                          onChange: (e) => {
                            const a = Array.from(e.target.selectedOptions).map(
                              (e) => e.value
                            );
                            f(a);
                          },
                        },
                        x.map((e) =>
                          l.a.createElement(
                            "option",
                            { key: e.id, value: e.id },
                            e.username
                          )
                        )
                      ),
                      l.a.createElement(
                        C.a.Text,
                        { className: "text-muted" },
                        "Select users to assign to this task."
                      )
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { controlId: "taskFiles", className: "mt-3" },
                      l.a.createElement(C.a.Label, null, "Upload Files"),
                      l.a.createElement(C.a.Control, {
                        type: "file",
                        multiple: !0,
                        onChange: (e) => {
                          j(Array.from(e.target.files));
                        },
                      }),
                      k.length > 0 &&
                        l.a.createElement(
                          "div",
                          { className: "mt-2" },
                          l.a.createElement("p", null, "Selected files:"),
                          l.a.createElement(
                            "ul",
                            null,
                            k.map((e, a) =>
                              l.a.createElement(
                                "li",
                                { key: a },
                                e.name,
                                " (",
                                Math.round(e.size / 1024),
                                " KB)"
                              )
                            )
                          )
                        )
                    ),
                    l.a.createElement(
                      "div",
                      { className: "d-flex justify-content-between mt-4" },
                      l.a.createElement(
                        w.a,
                        { variant: "primary", type: "submit", disabled: B },
                        B ? "Submitting..." : "Create Task"
                      ),
                      l.a.createElement(
                        w.a,
                        {
                          variant: "outline-secondary",
                          type: "button",
                          onClick: () => {
                            q(), t && t();
                          },
                        },
                        "Cancel"
                      )
                    )
                  )
                )
              );
        },
        P = t(163);
      var F = () => {
          const { id: e } = Object(c.s)(),
            a = Object(c.q)(),
            [t, r] = Object(n.useState)(""),
            [s, o] = Object(n.useState)(""),
            [i, u] = Object(n.useState)(new Date()),
            [d, p] = Object(n.useState)("low"),
            E = ["development", "design", "testing", "documentation", "other"],
            [g, v] = Object(n.useState)(E[0]),
            [y, h] = Object(n.useState)("pending"),
            [f, k] = Object(n.useState)([]),
            [j, x] = Object(n.useState)([]),
            [L, D] = Object(n.useState)([]),
            [A, F] = Object(n.useState)(!0),
            [G, z] = Object(n.useState)(!1),
            [B, U] = Object(n.useState)(""),
            [q, M] = Object(n.useState)("");
          Object(n.useEffect)(() => {
            (async () => {
              try {
                const a = localStorage.getItem("access_token"),
                  [t, n] = await Promise.all([
                    b.get(`/api/tasks/${e}/`, {
                      headers: { Authorization: "Bearer " + a },
                    }),
                    b.get("/api/users/", {
                      headers: { Authorization: "Bearer " + a },
                    }),
                  ]),
                  l = t.data;
                r(l.title),
                  o(l.description),
                  u(l.due_date ? new Date(l.due_date) : new Date()),
                  p(l.priority),
                  v(l.category || E[0]),
                  h(l.status),
                  k(l.assigned_users.map((e) => String(e))),
                  D(n.data);
              } catch (a) {
                U("Failed to load task or users.");
              } finally {
                F(!1);
              }
            })();
          }, [e]);
          return A
            ? l.a.createElement(
                m.a,
                { className: "text-center mt-5" },
                l.a.createElement(T.a, { animation: "border" }),
                l.a.createElement("p", null, "Loading task...")
              )
            : l.a.createElement(
                m.a,
                {
                  className: Object(_.a)(
                    O.a.container,
                    "d-flex",
                    "flex-column",
                    "justify-content-center",
                    "align-items-center",
                    "mt-5"
                  ),
                },
                l.a.createElement(
                  S.a,
                  {
                    className: "p-4 shadow",
                    style: { width: "100%", maxWidth: "600px" },
                  },
                  l.a.createElement(
                    "h3",
                    { className: "text-center mb-4" },
                    "Edit Task"
                  ),
                  B && l.a.createElement(N.a, { variant: "danger" }, B),
                  l.a.createElement(
                    C.a,
                    {
                      onSubmit: async (n) => {
                        n.preventDefault(), z(!0), U(""), M("");
                        const l = new FormData();
                        l.append("title", t),
                          l.append("description", s),
                          i instanceof Date &&
                            !isNaN(i) &&
                            l.append(
                              "due_date",
                              Object(P.default)(i, "yyyy-MM-dd")
                            ),
                          l.append("priority", d),
                          l.append("category", g),
                          l.append("status", y),
                          f.forEach((e) => {
                            l.append("assigned_users", Number(e));
                          }),
                          j.forEach((e) => l.append("upload_files", e));
                        try {
                          const t = localStorage.getItem("access_token");
                          await b.put(`/api/tasks/${e}/`, l, {
                            headers: {
                              "Content-Type": "multipart/form-data",
                              Authorization: "Bearer " + t,
                            },
                          }),
                            M("Task updated successfully!"),
                            a("/tasklist", {
                              state: {
                                message: "Edit successful",
                                type: "success",
                              },
                            });
                        } catch (r) {
                          r.response && r.response.data
                            ? U(
                                "Failed to update the task. Please check the console for details."
                              )
                            : U(
                                "Failed to update the task. An unexpected error occurred."
                              );
                        } finally {
                          z(!1);
                        }
                      },
                    },
                    l.a.createElement(
                      C.a.Group,
                      null,
                      l.a.createElement(
                        C.a.Label,
                        { htmlFor: "title" },
                        "Task Title"
                      ),
                      l.a.createElement(C.a.Control, {
                        type: "text",
                        id: "title",
                        name: "title",
                        placeholder: "Task Title",
                        value: t,
                        onChange: (e) => r(e.target.value),
                        required: !0,
                      })
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { className: "mt-3" },
                      l.a.createElement(
                        C.a.Label,
                        { htmlFor: "description" },
                        "Task Description"
                      ),
                      l.a.createElement(C.a.Control, {
                        as: "textarea",
                        id: "description",
                        name: "description",
                        placeholder: "Task Description",
                        value: s,
                        onChange: (e) => o(e.target.value),
                        rows: 3,
                        required: !0,
                      })
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { className: "mt-3" },
                      l.a.createElement(
                        C.a.Label,
                        { htmlFor: "dueDate" },
                        "Due Date"
                      ),
                      l.a.createElement(I.a, {
                        id: "dueDate",
                        name: "dueDate",
                        selected: i,
                        onChange: (e) => u(e),
                        className: "form-control",
                        required: !0,
                        dateFormat: "yyyy-MM-dd",
                      })
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { className: "mt-3" },
                      l.a.createElement(
                        C.a.Label,
                        { htmlFor: "priority" },
                        "Priority"
                      ),
                      l.a.createElement(
                        C.a.Select,
                        {
                          id: "priority",
                          name: "priority",
                          value: d,
                          onChange: (e) => p(e.target.value),
                        },
                        l.a.createElement("option", { value: "low" }, "Low"),
                        l.a.createElement(
                          "option",
                          { value: "medium" },
                          "Medium"
                        ),
                        l.a.createElement("option", { value: "high" }, "High")
                      )
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { className: "mt-3" },
                      l.a.createElement(
                        C.a.Label,
                        { htmlFor: "category" },
                        "Category"
                      ),
                      l.a.createElement(
                        C.a.Select,
                        {
                          id: "category",
                          name: "category",
                          value: g,
                          onChange: (e) => v(e.target.value),
                        },
                        E.map((e) =>
                          l.a.createElement(
                            "option",
                            { key: e, value: e },
                            e.charAt(0).toUpperCase() + e.slice(1),
                            " "
                          )
                        )
                      )
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { className: "mt-3" },
                      l.a.createElement(
                        C.a.Label,
                        { htmlFor: "status" },
                        "Status"
                      ),
                      l.a.createElement(
                        C.a.Select,
                        {
                          id: "status",
                          name: "status",
                          value: y,
                          onChange: (e) => h(e.target.value),
                        },
                        l.a.createElement(
                          "option",
                          { value: "pending" },
                          "Pending"
                        ),
                        l.a.createElement(
                          "option",
                          { value: "in_progress" },
                          "In Progress"
                        ),
                        l.a.createElement("option", { value: "done" }, "Done")
                      )
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { className: "mt-3" },
                      l.a.createElement(
                        C.a.Label,
                        { htmlFor: "assignedUsers" },
                        "Assigned Users"
                      ),
                      l.a.createElement(
                        C.a.Select,
                        {
                          multiple: !0,
                          id: "assignedUsers",
                          name: "assigned_users",
                          value: f,
                          onChange: (e) => {
                            const a = Array.from(e.target.selectedOptions).map(
                              (e) => e.value
                            );
                            k(a);
                          },
                        },
                        L.map((e) =>
                          l.a.createElement(
                            "option",
                            { key: e.id, value: String(e.id) },
                            e.name || e.username
                          )
                        )
                      )
                    ),
                    l.a.createElement(
                      C.a.Group,
                      { className: "mt-3" },
                      l.a.createElement(C.a.Label, null, "Upload Files"),
                      l.a.createElement(C.a.Control, {
                        type: "file",
                        multiple: !0,
                        onChange: (e) => {
                          x(Array.from(e.target.files));
                        },
                      })
                    ),
                    l.a.createElement(
                      "div",
                      { className: "d-flex justify-content-between mt-4" },
                      l.a.createElement(
                        w.a,
                        { variant: "primary", type: "submit", disabled: G },
                        G ? "Saving..." : "Edit Task"
                      ),
                      l.a.createElement(
                        w.a,
                        {
                          variant: "outline-secondary",
                          type: "button",
                          onClick: () => {
                            a("/tasklist", {
                              state: {
                                message: "Edit cancelled",
                                type: "info",
                              },
                            });
                          },
                        },
                        "Cancel"
                      )
                    )
                  )
                )
              );
        },
        G = t(171),
        z = t(177);
      var B = () => {
        var e;
        const [a, t] = Object(n.useState)([]),
          [r, s] = Object(n.useState)([]),
          [i, u] = Object(n.useState)(null),
          [d, p] = Object(n.useState)(""),
          [E, g] = Object(n.useState)({ category: "", status: "" }),
          [v, y] = Object(n.useState)("dueDate"),
          [h, j] = Object(n.useState)(!0),
          [x, L] = Object(n.useState)(""),
          [D, I] = Object(n.useState)(null),
          [A, P] = Object(n.useState)(null),
          [F, B] = Object(n.useState)(!1),
          [U, q] = Object(n.useState)(null),
          M = Object(c.q)();
        Object(n.useEffect)(() => {
          (async () => {
            j(!0), L("");
            try {
              const e = await b.get("/api/tasks/");
              t(e.data);
              const a = await b.get("/api/users/");
              s(a.data);
            } catch (n) {
              var e, a;
              L(
                (null === (e = n.response) ||
                void 0 === e ||
                null === (a = e.data) ||
                void 0 === a
                  ? void 0
                  : a.detail) ||
                  n.message ||
                  "Unable to load data."
              );
            } finally {
              j(!1);
            }
          })();
        }, []);
        const H = (e) => {
            const a = r.find((a) => a.id === e);
            return a ? a.username : "Unknown User";
          },
          R = Object(n.useMemo)(() => {
            let e = a;
            if (d) {
              const a = d.toLowerCase();
              e = e.filter((e) => {
                var t, n, l, r;
                return (
                  (null === (t = e.title) || void 0 === t
                    ? void 0
                    : t.toLowerCase().includes(a)) ||
                  (null === (n = e.description) || void 0 === n
                    ? void 0
                    : n.toLowerCase().includes(a)) ||
                  (null === (l = e.category) || void 0 === l
                    ? void 0
                    : l.toLowerCase().includes(a)) ||
                  (null === (r = e.assigned_users) || void 0 === r
                    ? void 0
                    : r.some((e) => H(e).toLowerCase().includes(a)))
                );
              });
            }
            E.category &&
              (e = e.filter((e) => {
                var a;
                return (
                  (null === (a = e.category) || void 0 === a
                    ? void 0
                    : a.toLowerCase()) === E.category.toLowerCase()
                );
              })),
              E.status &&
                (e = e.filter((e) => {
                  var a;
                  return (
                    (null === (a = e.status) || void 0 === a
                      ? void 0
                      : a.toLowerCase()) === E.status.toLowerCase()
                  );
                }));
            return [...e].sort((e, a) => {
              if ("dueDate" === v) {
                const t = e.due_date ? new Date(e.due_date) : null,
                  n = a.due_date ? new Date(a.due_date) : null;
                return t && n ? t.getTime() - n.getTime() : t ? -1 : n ? 1 : 0;
              }
              if ("priority" === v) {
                var t, n;
                const l = { high: 3, medium: 2, low: 1 },
                  r =
                    l[
                      null === (t = e.priority) || void 0 === t
                        ? void 0
                        : t.toLowerCase()
                    ] || 0;
                return (
                  (l[
                    null === (n = a.priority) || void 0 === n
                      ? void 0
                      : n.toLowerCase()
                  ] || 0) - r
                );
              }
              return 0;
            });
          }, [a, r, d, E, v]),
          J = () => u(null),
          W = (e, a) => g((t) => ({ ...t, [e]: a })),
          $ = async (e) => {
            I(e.id);
            try {
              await b.patch(`/api/tasks/${e.id}/`, { status: "done" });
              const n = a.map((a) =>
                a.id === e.id ? { ...a, status: "done" } : a
              );
              t(n), i && i.id === e.id && u((e) => ({ ...e, status: "done" }));
            } catch (n) {
              L("Failed to mark task complete. Please try again.");
            } finally {
              I(null);
            }
          },
          Z = (e, a) => {
            a.stopPropagation(), q(e), B(!0);
          },
          K = () => {
            B(!1), q(null);
          };
        return l.a.createElement(
          m.a,
          {
            className: Object(_.a)(
              O.a.container,
              "d-flex",
              "flex-column",
              "justify-content-center",
              "align-items-center",
              "mt-5"
            ),
          },
          l.a.createElement(
            S.a,
            { className: "p-4 shadow w-100", style: { maxWidth: "960px" } },
            l.a.createElement(
              "h3",
              { className: "text-center mb-4" },
              "Your Task List"
            ),
            l.a.createElement(
              C.a,
              { className: "mb-4" },
              l.a.createElement(
                f.a,
                { className: "align-items-end g-3 justify-content-center" },
                l.a.createElement(
                  k.a,
                  { md: 4 },
                  l.a.createElement(
                    C.a.Group,
                    { controlId: "searchTasks" },
                    l.a.createElement(C.a.Label, null, "Search"),
                    l.a.createElement(C.a.Control, {
                      type: "text",
                      placeholder: "Search tasks...",
                      value: d,
                      onChange: (e) => p(e.target.value),
                    })
                  )
                ),
                l.a.createElement(
                  k.a,
                  { md: 4 },
                  l.a.createElement(
                    C.a.Group,
                    { controlId: "categoryFilter" },
                    l.a.createElement(C.a.Label, null, "Category"),
                    l.a.createElement(
                      C.a.Select,
                      {
                        value: E.category,
                        onChange: (e) => W("category", e.target.value),
                      },
                      l.a.createElement(
                        "option",
                        { value: "" },
                        "All Categories"
                      ),
                      [
                        "development",
                        "design",
                        "testing",
                        "documentation",
                        "other",
                      ].map((e) =>
                        l.a.createElement(
                          "option",
                          { key: e, value: e },
                          e.charAt(0).toUpperCase() + e.slice(1)
                        )
                      )
                    )
                  )
                ),
                l.a.createElement(
                  k.a,
                  { md: 4 },
                  l.a.createElement(
                    C.a.Group,
                    { controlId: "statusFilter" },
                    l.a.createElement(C.a.Label, null, "Status"),
                    l.a.createElement(
                      C.a.Select,
                      {
                        value: E.status,
                        onChange: (e) => W("status", e.target.value),
                      },
                      l.a.createElement(
                        "option",
                        { value: "" },
                        "All Statuses"
                      ),
                      ["pending", "in_progress", "done"].map((e) =>
                        l.a.createElement(
                          "option",
                          { key: e, value: e },
                          e
                            .replace("_", " ")
                            .split(" ")
                            .map((e) => e.charAt(0).toUpperCase() + e.slice(1))
                            .join(" ")
                        )
                      )
                    )
                  )
                ),
                l.a.createElement(
                  k.a,
                  { md: 4 },
                  l.a.createElement(
                    C.a.Group,
                    { controlId: "sortBy" },
                    l.a.createElement(C.a.Label, null, "Sort By"),
                    l.a.createElement(
                      C.a.Select,
                      {
                        value: v,
                        onChange: (e) => {
                          return (a = e.target.value), y(a);
                          var a;
                        },
                      },
                      l.a.createElement(
                        "option",
                        { value: "dueDate" },
                        "Due Date"
                      ),
                      l.a.createElement(
                        "option",
                        { value: "priority" },
                        "Priority"
                      )
                    )
                  )
                )
              )
            ),
            h
              ? l.a.createElement(
                  "div",
                  { className: "text-center" },
                  l.a.createElement(
                    T.a,
                    { animation: "border", role: "status" },
                    l.a.createElement(
                      "span",
                      { className: "visually-hidden" },
                      "Loading Tasks..."
                    )
                  )
                )
              : x
              ? l.a.createElement(N.a, { variant: "danger" }, x)
              : l.a.createElement(
                  G.a,
                  {
                    striped: !0,
                    bordered: !0,
                    hover: !0,
                    responsive: !0,
                    className: "text-center",
                  },
                  l.a.createElement(
                    "thead",
                    null,
                    l.a.createElement(
                      "tr",
                      null,
                      l.a.createElement("th", null, "Title"),
                      l.a.createElement("th", null, "Due Date"),
                      l.a.createElement("th", null, "Priority"),
                      l.a.createElement("th", null, "Category"),
                      " ",
                      l.a.createElement("th", null, "Status"),
                      l.a.createElement("th", null, "Assigned Users"),
                      l.a.createElement("th", null, "Actions")
                    )
                  ),
                  l.a.createElement(
                    "tbody",
                    null,
                    R.length > 0
                      ? R.map((e) => {
                          var a;
                          return l.a.createElement(
                            "tr",
                            {
                              key: e.id,
                              onClick: () => ((e) => u(e))(e),
                              style: { cursor: "pointer" },
                            },
                            l.a.createElement("td", null, e.title),
                            l.a.createElement(
                              "td",
                              null,
                              e.due_date
                                ? new Date(e.due_date).toLocaleDateString()
                                : "No Due Date"
                            ),
                            l.a.createElement("td", null, e.priority),
                            l.a.createElement("td", null, e.category),
                            l.a.createElement("td", null, e.status),
                            l.a.createElement(
                              "td",
                              null,
                              e.assigned_users &&
                                Array.isArray(e.assigned_users)
                                ? e.assigned_users.map((e) => H(e)).join(", ")
                                : "Unassigned"
                            ),
                            l.a.createElement(
                              "td",
                              null,
                              l.a.createElement(
                                o.b,
                                {
                                  to: "/edittask/" + e.id,
                                  onClick: (e) => e.stopPropagation(),
                                },
                                l.a.createElement(
                                  w.a,
                                  {
                                    variant: "outline-primary",
                                    size: "sm",
                                    className: "me-2",
                                  },
                                  "Edit"
                                )
                              ),
                              l.a.createElement(
                                w.a,
                                {
                                  variant: "outline-success",
                                  size: "sm",
                                  className: "me-2",
                                  onClick: (a) => {
                                    a.stopPropagation(), $(e);
                                  },
                                  disabled:
                                    "done" ===
                                      (null === (a = e.status) || void 0 === a
                                        ? void 0
                                        : a.toLowerCase()) || D === e.id,
                                },
                                D === e.id
                                  ? l.a.createElement(T.a, {
                                      size: "sm",
                                      animation: "border",
                                    })
                                  : "Complete"
                              ),
                              l.a.createElement(
                                w.a,
                                {
                                  variant: "outline-danger",
                                  size: "sm",
                                  onClick: (a) => Z(e, a),
                                  disabled: A === e.id,
                                },
                                A === e.id
                                  ? l.a.createElement(T.a, {
                                      size: "sm",
                                      animation: "border",
                                    })
                                  : "Delete"
                              )
                            )
                          );
                        })
                      : l.a.createElement(
                          "tr",
                          null,
                          l.a.createElement(
                            "td",
                            { colSpan: "7", className: "text-center" },
                            a.length > 0
                              ? "No tasks match your criteria."
                              : "No tasks available."
                          )
                        )
                  )
                )
          ),
          i &&
            l.a.createElement(
              l.a.Fragment,
              null,
              l.a.createElement("div", {
                className: "position-fixed top-0 start-0 w-100 h-100",
                style: { backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 },
                onClick: J,
              }),
              l.a.createElement(
                S.a,
                {
                  className:
                    "position-fixed top-50 start-50 translate-middle p-4 shadow",
                  style: { zIndex: 1050, width: "90%", maxWidth: "500px" },
                },
                l.a.createElement("h4", null, i.title),
                l.a.createElement(
                  "p",
                  null,
                  l.a.createElement("strong", null, "Description:"),
                  " ",
                  i.description
                ),
                l.a.createElement(
                  "p",
                  null,
                  l.a.createElement("strong", null, "Due:"),
                  " ",
                  i.due_date
                    ? new Date(i.due_date).toLocaleDateString()
                    : "No Due Date"
                ),
                l.a.createElement(
                  "p",
                  null,
                  l.a.createElement("strong", null, "Category:"),
                  " ",
                  i.category,
                  " "
                ),
                l.a.createElement(
                  "p",
                  null,
                  l.a.createElement("strong", null, "Priority:"),
                  " ",
                  i.priority
                ),
                l.a.createElement(
                  "p",
                  null,
                  l.a.createElement("strong", null, "Status:"),
                  " ",
                  i.status
                ),
                l.a.createElement(
                  "p",
                  null,
                  l.a.createElement("strong", null, "Assigned:"),
                  " ",
                  i.assigned_users && Array.isArray(i.assigned_users)
                    ? i.assigned_users.map((e) => H(e)).join(", ")
                    : "Unassigned"
                ),
                i.upload_files &&
                  i.upload_files.length > 0 &&
                  l.a.createElement(
                    "div",
                    { className: "mt-3" },
                    l.a.createElement("strong", null, "Attached Files:"),
                    l.a.createElement(
                      "ul",
                      null,
                      i.upload_files.map((e) =>
                        l.a.createElement(
                          "li",
                          { key: e.id },
                          l.a.createElement(
                            "a",
                            {
                              href: e.file,
                              target: "_blank",
                              rel: "noopener noreferrer",
                            },
                            e.file.split("/").pop(),
                            " "
                          )
                        )
                      )
                    )
                  ),
                l.a.createElement(
                  "div",
                  { className: "d-flex justify-content-between mt-3" },
                  l.a.createElement(
                    w.a,
                    {
                      variant: "success",
                      onClick: () => $(i),
                      disabled:
                        "done" ===
                          (null === (e = i.status) || void 0 === e
                            ? void 0
                            : e.toLowerCase()) ||
                        D === (null === i || void 0 === i ? void 0 : i.id),
                    },
                    D === (null === i || void 0 === i ? void 0 : i.id)
                      ? l.a.createElement(T.a, {
                          size: "sm",
                          animation: "border",
                        })
                      : "Complete"
                  ),
                  l.a.createElement(
                    w.a,
                    {
                      variant: "warning",
                      onClick: (e) => {
                        return (
                          (a = i.id),
                          e.stopPropagation(),
                          J(),
                          void M("/edittask/" + a)
                        );
                        var a;
                      },
                    },
                    "Edit"
                  ),
                  l.a.createElement(
                    w.a,
                    {
                      variant: "danger",
                      onClick: (e) => Z(i, e),
                      disabled:
                        A === (null === i || void 0 === i ? void 0 : i.id),
                    },
                    A === (null === i || void 0 === i ? void 0 : i.id)
                      ? l.a.createElement(T.a, {
                          size: "sm",
                          animation: "border",
                        })
                      : "Delete"
                  ),
                  l.a.createElement(
                    w.a,
                    { variant: "secondary", onClick: J },
                    "Close"
                  )
                )
              )
            ),
          l.a.createElement(
            z.a,
            { show: F, onHide: K },
            l.a.createElement(
              z.a.Header,
              { closeButton: !0 },
              l.a.createElement(z.a.Title, null, "Confirm Deletion")
            ),
            l.a.createElement(
              z.a.Body,
              null,
              'Are you sure you want to delete the task "',
              null === U || void 0 === U ? void 0 : U.title,
              '"?'
            ),
            l.a.createElement(
              z.a.Footer,
              null,
              l.a.createElement(
                w.a,
                { variant: "secondary", onClick: K },
                "Cancel"
              ),
              l.a.createElement(
                w.a,
                {
                  variant: "danger",
                  onClick: async () => {
                    if (U) {
                      P(U.id), B(!1), L("");
                      try {
                        await b.delete(`/api/tasks/${U.id}/`),
                          t(a.filter((e) => e.id !== U.id)),
                          i && i.id === U.id && u(null);
                      } catch (l) {
                        var e, n;
                        L(
                          (null === (e = l.response) ||
                          void 0 === e ||
                          null === (n = e.data) ||
                          void 0 === n
                            ? void 0
                            : n.detail) ||
                            l.message ||
                            "Failed to delete task. Please try again."
                        );
                      } finally {
                        P(null), q(null);
                      }
                    }
                  },
                  disabled: null !== A,
                },
                A === (null === U || void 0 === U ? void 0 : U.id)
                  ? l.a.createElement(T.a, { size: "sm", animation: "border" })
                  : "Delete"
              )
            )
          ),
          x &&
            l.a.createElement(
              "div",
              {
                className: "position-fixed bottom-0 end-0 p-3",
                style: { zIndex: 1060 },
              },
              l.a.createElement(
                N.a,
                { variant: "danger", onClose: () => L(""), dismissible: !0 },
                x
              )
            )
        );
      };
      var U = () =>
        l.a.createElement(
          m.a,
          {
            className: Object(_.a)(
              O.a.container,
              "d-flex",
              "flex-column",
              "justify-content-center",
              "align-items-center"
            ),
          },
          l.a.createElement(
            f.a,
            { className: "justify-content-center mb-5" },
            l.a.createElement(
              k.a,
              { md: 10, lg: 8 },
              l.a.createElement(
                "h1",
                {
                  className:
                    "display-4 fw-bold text-primary styles.responsiveTitle",
                },
                "Stay Productive, Stay Ahead"
              ),
              l.a.createElement(
                "p",
                { className: "lead mt-3 fs-4 styles.responsiveSubtitle" },
                "Organize your life and collaborate better with our calendar-driven productivity app. Plan your tasks, track habits, and achieve more together."
              ),
              l.a.createElement(
                "div",
                { className: "d-flex justify-content-center gap-3 mt-3" },
                l.a.createElement(
                  o.b,
                  { to: "/register" },
                  l.a.createElement(
                    w.a,
                    { variant: "outline-primary", size: "lg" },
                    "Get Started"
                  )
                ),
                l.a.createElement(
                  o.b,
                  { to: "/login" },
                  l.a.createElement(
                    w.a,
                    { variant: "outline-success", size: "lg" },
                    "Login"
                  )
                )
              )
            )
          )
        );
      var q = () => {
        const [e, a] = Object(n.useState)(null);
        return l.a.createElement(
          l.a.Fragment,
          null,
          e &&
            l.a.createElement(
              "div",
              {
                style: {
                  backgroundColor: "#f0f0f0",
                  padding: "20px",
                  margin: "20px",
                  border: "1px solid #ccc",
                },
              },
              l.a.createElement(
                "h3",
                { style: { margin: "0 0 10px 0" } },
                "Debug Data:"
              ),
              l.a.createElement("pre", null, JSON.stringify(e, null, 2))
            ),
          l.a.createElement(A, {
            onSubmit: async (e) => {
              try {
                var t, n;
                const l = new FormData();
                l.append("title", e.title),
                  l.append("description", e.description),
                  l.append("due_date", e.dueDate.toISOString().split("T")[0]),
                  l.append("priority", e.priority),
                  l.append("category", e.category),
                  l.append("status", e.status.toLowerCase()),
                  (null === (t = e.assignedUsers) || void 0 === t
                    ? void 0
                    : t.length) > 0 &&
                    e.assignedUsers.forEach((e) => {
                      l.append("assigned_users", e);
                    }),
                  (null === (n = e.files) || void 0 === n ? void 0 : n.length) >
                    0 && e.files.forEach((e) => l.append("upload_files", e));
                const r = localStorage.getItem("access_token"),
                  s = {};
                l.forEach((e, a) => {
                  s[a]
                    ? (Array.isArray(s[a]) || (s[a] = [s[a]]), s[a].push(e))
                    : (s[a] = e);
                }),
                  a({ taskData: e, formData: s });
                return (
                  await y.a.post("http://localhost:8000/api/tasks/", l, {
                    headers: { Authorization: "Bearer " + r },
                  })
                ).data;
              } catch (l) {
                throw (
                  (l.response
                    ? alert(
                        "Task creation failed: " +
                          JSON.stringify(l.response.data)
                      )
                    : alert("Network error: " + l.message),
                  l)
                );
              }
            },
          })
        );
      };
      var M = function () {
        const [e, a] = Object(n.useState)(!1);
        return l.a.createElement(
          "div",
          { className: "App" },
          l.a.createElement(E, {
            isLoggedIn: e,
            onLogout: () => {
              a(!1);
            },
          }),
          l.a.createElement(
            m.a,
            { className: v.a.container },
            l.a.createElement(
              c.d,
              null,
              l.a.createElement(c.b, {
                path: "/",
                element: e
                  ? l.a.createElement(c.a, { to: "/createtask" })
                  : l.a.createElement(U, null),
              }),
              l.a.createElement(c.b, {
                path: "/login",
                element: e
                  ? l.a.createElement(c.a, { to: "/createtask" })
                  : l.a.createElement(x, {
                      onLogin: () => {
                        a(!0);
                      },
                    }),
              }),
              l.a.createElement(c.b, {
                path: "/register",
                element: l.a.createElement(L, null),
              }),
              l.a.createElement(c.b, {
                path: "/createtask",
                element: e
                  ? l.a.createElement(q, {
                      users: [],
                      onSubmit: (e) => {},
                      onCancel: () => {},
                    })
                  : l.a.createElement(c.a, { to: "/login" }),
              }),
              l.a.createElement(c.b, {
                path: "/edittask/:id",
                element: e
                  ? l.a.createElement(F, null)
                  : l.a.createElement(c.a, { to: "/login" }),
              }),
              l.a.createElement(c.b, {
                path: "/tasklist",
                element: e
                  ? l.a.createElement(B, null)
                  : l.a.createElement(c.a, { to: "/login" }),
              })
            )
          )
        );
      };
      s.a
        .createRoot(document.getElementById("root"))
        .render(
          l.a.createElement(
            l.a.StrictMode,
            null,
            l.a.createElement(
              o.a,
              { future: { v7_startTransition: !0 } },
              l.a.createElement(M, null)
            )
          )
        );
    },
    22: function (e, a, t) {
      e.exports = {
        container: "Common_container__1k6nZ",
        responsiveTitle: "Common_responsiveTitle__2IxBN",
        responsiveSubtitle: "Common_responsiveSubtitle__2vazn",
      };
    },
    52: function (e, a, t) {
      e.exports = {
        NavBar: "NavBar_NavBar__2iEPv",
        NavLink: "NavBar_NavLink__2Jd5H",
      };
    },
    97: function (e, a, t) {
      e.exports = { App: "App_App__1au9W", Main: "App_Main__13Z4N" };
    },
  },
  [[104, 1, 2]],
]);
//# sourceMappingURL=main.dddf3972.chunk.js.map
